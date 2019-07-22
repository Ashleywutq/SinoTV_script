import requests
import re
from bs4 import BeautifulSoup
from datetime import date

link = ["https://weather.com/weather/tenday/l/USTX0617:1:US",\
		"https://weather.com/weather/tenday/l/USMA0046:1:US",\
		"https://weather.com/weather/tenday/l/Los+Angeles+CA+USCA0638:1:US",\
		"https://weather.com/weather/tenday/l/New+York+NY+USNY0996:1:US",\
		"https://weather.com/weather/tenday/l/San+Francisco+CA+USCA0987:1:US",\
		"https://weather.com/weather/tenday/l/USIL0225:1:US",\
		"https://weather.com/weather/tenday/l/USDC0001:1:US",\
		"https://weather.com/weather/tenday/l/Seattle+WA+USWA0395:1:US",\
		"https://weather.com/weather/tenday/l/USPA1276:1:US",\
		"https://weather.com/weather/tenday/l/USAZ0166:1:US",\
		"https://weather.com/weather/tenday/l/Shanghai+China+CHXX0116:1:CH",\
		"https://weather.com/weather/tenday/l/UKXX0085:1:UK",\
		"https://weather.com/weather/tenday/l/Beijing+China+CHXX0008",\
		"https://weather.com/weather/tenday/l/Taipei+Taiwan+TWXX0021:1:TW",\
		"https://weather.com/weather/tenday/l/Mexico+City+Mexico+MXDF0132:1:MX",\
		"https://weather.com/weather/tenday/l/CAXX0504:1:CA",\
		"https://weather.com/weather/tenday/l/Paris+France+FRXX0076:1:FR",\
		"https://weather.com/weather/tenday/l/SNXX0006:1:SN",\
		"https://weather.com/weather/tenday/l/Tokyo+Japan+JAXX0085:1:JA",\
		"https://weather.com/weather/tenday/l/Hong+Kong+HK+HKXX0049:1:HK"
		]

name = ["Houston",\
		"Boston",\
		"Los Angeles",\
		"New York",\
		"San Francisco",\
		"Chicago",\
		"Washington DC",\
		"Seattle",\
		"philadelphia",\
		"Phoenix",\
		"Shanghai",\
		"London",\
		"Beijing",\
		"Taipei",\
		"Mexico city",\
		"Toronto",\
		"Paris",\
		"Singapore",\
		"Tokyo",\
		"Hongkong"
		]

#date
today = date.today()
d3 = today.strftime("%m-%d-%y")
print(d3)
filename = d3+".txt"
file = open(filename,'w+')

for n in range(20):

	page=requests.get(link[n])
	content=page.content

	soup=BeautifulSoup(content,"html.parser")
	table=soup.find_all("table",{"class":"twc-table"})
	items = table[0]

	# #print only
	# print(name[n])

	# weather = items.find_all("td",{"class":"description"})[1].text.lower()
	# outweather = "nah"
	# if "sunny" in weather:
	# 	outweather = "sunny"
	# if "cloudy" in weather:
	# 	if "partly" in weather:
	# 		outweather = "partlycloudy"
	# 	else:
	# 		outweather = "cloudy"
	# if "windy" in weather: 
	# 	outweather = "windy"
	# if ("rain" in weather) or ("dizzle" in weather) or ("shower" in weather):
	# 	outweather = "rain"
	# if ("thunder" in weather) or ("storm" in weather):
	# 	outweather = "thunder"
	# if "snow" in weather:
	# 	outweather = "snow"
	# # print(weather)
	# print(outweather)

	# temp = re.findall(r'\d+', items.find_all("td",{"class":"temp"})[1].text)
	# print(str(temp[1])+'-'+str(temp[0]))

	#write only
	file.write(name[n])
	file.write("\n")
	
	weather = items.find_all("td",{"class":"description"})[1].text.lower()
	outweather = "nah"
	if "sun" in weather:
		outweather = "sunny"
	if "cloud" in weather:
		if "partly" in weather:
			outweather = "partlycloudy"
		else:
			outweather = "cloudy"
	if "wind" in weather: 
		outweather = "windy"
	if ("rain" in weather) or ("dizzle" in weather) or ("shower" in weather):
		outweather = "rain"
	if ("thunder" in weather) or ("storm" in weather):
		outweather = "thunder"
	if "snow" in weather:
		outweather = "snow"
	# print(weather)
	file.write(outweather)
	file.write("\n")

	temp = re.findall(r'\d+', items.find_all("td",{"class":"temp"})[1].text)
	file.write(str(temp[0]))
	file.write("\n")
	file.write(str(temp[1]))	
	file.write("\n")

#close file
file.close()




