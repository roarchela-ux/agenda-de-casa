#!/usr/bin/env python3
"""Export approved app mission copy without backend IDs or private source metadata.
Usage: python3 tools/import-catalog.py /absolute/path/to/metodos_da_ro
"""
import collections
import json
from pathlib import Path
import sys

ROOMS = {'sala':'Sala','cozinha':'Cozinha','quarto':'Quarto','banheiro':'Banheiro','area_servico':'Área de serviço','escritorio':'Escritório','area_externa':'Área externa','outro':'Outro'}

def build_catalog(root):
    source = Path(root) / 'api/db/content'
    def read(name):
        return json.loads((source / name).read_text())
    missions = {m['editorial_rank']: m for m in read('varied_mission_bank.json')['missions']}
    for patch in read('mission_copy_corrections.json')['corrections']:
        missions[patch['editorial_rank']]['directions'][patch['direction_index']]['text'] = patch['text']
    for item in read('whole_house_care_bank.json')['missions']:
        rank = item['editorial_rank']
        if item['operation'] == 'add':
            assert rank not in missions
            missions[rank] = item
        else:
            assert rank in missions
            for key in ['title','scope','directions','tip']:
                missions[rank][key] = item[key]
    # Migration 0018 applies this terminology change throughout published copy.
    def laundry(value):
        if isinstance(value,str):
            return value.replace('Área de serviço','Lavanderia').replace('área de serviço','lavanderia')
        if isinstance(value,list): return [laundry(v) for v in value]
        if isinstance(value,dict): return {k:laundry(v) for k,v in value.items()}
        return value
    for mission in missions.values():
        for key in ['title','scope','directions','tip']:
            mission[key] = laundry(mission[key])
    for name,fields in [
        ('oven_mission_correction.json',['title','scope','directions','tip']),
        ('daily_priorities_correction.json',['title','scope','directions','tip']),
        ('daily_priorities_scope_correction.json',['title','scope','directions','tip']),
        ('folding_dry_clothes_correction.json',['title','scope','directions','tip']),
        ('bed_linen_wording_correction.json',['scope']),
        ('towels_drying_correction.json',['title','scope','directions','tip']),
        ('small_laundry_title_correction.json',['title']),
    ]:
        patch = read(name)
        mission = missions[patch['editorial_rank']]
        for key in fields: mission[key] = patch[key]
    patch = read('donation_books_review_correction.json')
    missions[patch['editorial_rank']]['directions'][1]['text'] = patch['directions'][1]['text']
    result=[]
    for rank,m in sorted(missions.items()):
        result.append({'id':str(rank),'room':ROOMS[m['room_code']],'minutes':m['duration_minutes'],**{k:m[k] for k in ['title','scope','directions','tip']}})
    assert len(result)==188
    assert collections.Counter(m['minutes'] for m in result)=={5:40,15:108,30:40}
    assert len({m['id'] for m in result})==len(result)
    for m in result:
        assert m['title'] and m['scope'] and m['tip'] and m['directions']
        assert all(d['title'] and d['text'] for d in m['directions'])
    for room in ROOMS.values():
        for minutes in [5,15,30]:
            assert any(m['room']==room and m['minutes']==minutes for m in result)
    return {'version':patch['version'],'missions':result}

if __name__=='__main__':
    catalog = build_catalog(sys.argv[1])
    output=Path(__file__).resolve().parents[1]/'catalog.js'
    payload=json.dumps(catalog,ensure_ascii=False,separators=(',',':'))
    output.write_text('// Generated from approved application content. See tools/import-catalog.py.\nwindow.AGENDA_CATALOG = '+payload+';\n')
    print(f"{len(catalog['missions'])} missions exported ({catalog['version']}).")
