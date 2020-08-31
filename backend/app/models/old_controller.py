import json
import uuid
from app.models.SwN import SwN
from app.models.PowerSource import PowerSource

def createTestData():
  powersource1_id = str(uuid.uuid4())
  output1_id = str(uuid.uuid4())
  powersource2_id = str(uuid.uuid4())
  output2_id = str(uuid.uuid4())
  swn_id = str(uuid.uuid4())
  input1_id = str(uuid.uuid4())
  input2_id = str(uuid.uuid4())
  output3_id = str(uuid.uuid4())
  output4_id = str(uuid.uuid4())

  data = {
    'components': [
      {
        "id": powersource1_id,
        "kind": "powersource",
        "outputs":[
          {
            "id": output1_id,
            "target_id": input1_id,
            "power": 8
          }
        ]
      },
      {
        "id": powersource2_id,
        "kind": "powersource",
        "outputs":[
          {
            "id": output2_id,
            "target_id": input2_id,
            "power": 8
          }
        ]
      },
      {
        "id": swn_id,
        "kind": "swn",
        "inputs": [
          {
            "id": input1_id,
            "target_id": output1_id
          },
          {
            "id": input2_id,
            "target_id": output2_id
          }
        ],
        "outputs": [
          {
            "id": output3_id,
            "target_id": None
          },
          {
            "id": output4_id,
            "target_id": None
          }
        ]
      }
    ]
  }

  with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

def parseData(filePath):
  switches = []

  with open(filePath) as json_file:
    data = json.load(json_file)

    #validate data

    for component in data['components']:
      if (component['kind'] == 'swn'):
        switches.append(SwN(component))
      elif (component['kind'] == 'powersource'):
        switches.append(PowerSource(component))

  return switches