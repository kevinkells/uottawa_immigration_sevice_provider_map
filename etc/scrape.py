import requests
import time

text = ""
for i in range(1,198):
	print (i)
	time.sleep(0.1)
	response = requests.get("https://services.immigration-quebec.gouv.qc.ca/fr/partenaires/services-offerts.php?partenaire={}".format(i))
	text += "id:{}\n{}\n".format(i,response.text)
	#print(text)

file = open("qc.txt","w", encoding="utf-8")
file.write(text)
file.close()