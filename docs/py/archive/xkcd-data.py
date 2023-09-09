# import requests
# import pickle

# import re
# def striphtml(data):
#   p = re.compile(r'<.*?>')
#   return p.sub('', data)


# list = []
# for i in range(1,2700):
#   with requests.get('https://www.explainxkcd.com/wiki/index.php/'+str(i)) as r:
#     try:
#       got = striphtml(''.join(r.text.split('Transcript">edit')[1].split('id="Discussion">')[0:-2]).lower())
#       list.append(got)
#     except:
#       list.append('')
#       print(i)
# with open('xkcd', 'wb') as f:
#   pickle.dump(list,f)
import pickle
import requests

string = 'puppets'
with open('xkcd', 'rb') as f:
  list_of_xkcd_strings = pickle.load(f)
  number=0
  for index,i in enumerate(list_of_xkcd_strings):
    if string.lower() in i:
      number = index+1
      break
  url = f'https://xkcd.com/{number}/info.0.json'
  with requests.get(url) as r:
    data = r.json()
    print(data)