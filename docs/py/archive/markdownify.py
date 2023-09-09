from markdownify import markdownify as md

import glob
l = glob.glob('./*')

for each in l:
	title= each.split('./')[-1]
	with open(each,'r') as file:
		html=file.read()
	with open(''.join(title.split('.')[:-1])+'.txt','w') as output:
		output.write(md(html))