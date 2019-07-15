import requests
import re
from bs4 import BeautifulSoup
from datetime import date

link = ["https://weather.com/weather/tenday/l/THXX0002:1:TH", \
		"https://weather.com/weather/tenday/l/USNY2152:27:US",\
		"https://weather.com/weather/tenday/l/Beijing+China+CHXX0008:1:CH",\
		"https://weather.com/weather/tenday/l/USMA0046:1:US",\
		"https://weather.com/weather/tenday/l/2206:19:US",\
		"https://weather.com/weather/tenday/l/USIL0225:1:US",\
		"https://weather.com/weather/tenday/l/60126:4:US",\
		"https://weather.com/weather/tenday/l/USNY0504",\
		"https://weather.com/weather/tenday/l/Hong+Kong+HK+HKXX0049:1:HK",\
		"https://weather.com/weather/tenday/l/Houston+TX+USTX0617",\
		"https://weather.com/weather/tenday/l/11743:4:US",\
		"https://weather.com/weather/tenday/l/John+F+Kennedy+International+Airport+NY+JFK:9:US",\
		"https://weather.com/weather/tenday/l/Las+Vegas+NV+USNV0049:1:US",\
		"https://weather.com/weather/tenday/l/London+UKXX0085:1:UK",\
		"https://weather.com/weather/tenday/l/Los+Angeles+CA+USCA0638:1:US",\
		"https://weather.com/weather/tenday/l/USFL0316:1:US",\
		"https://weather.com/weather/tenday/l/USNY0996:1:US",\
		"https://weather.com/weather/tenday/l/Newark+NJ+USNJ0355:1:US",\
		"https://weather.com/weather/tenday/l/Paris+France+FRXX0076:1:FR",\
		"https://weather.com/weather/tenday/l/USAZ0166:1:US",\
		"https://weather.com/weather/tenday/l/ITXX0067:1:IT",\
		"https://weather.com/weather/tenday/l/San+Francisco+CA+USCA0987:1:US",\
		"https://weather.com/weather/tenday/l/Seoul+South+Korea+KSXX0037:1:KS",\
		"https://weather.com/weather/tenday/l/Shanghai+China+CHXX0116:1:CH",\
		"https://weather.com/weather/tenday/l/SNXX0006:1:SN",\
		"https://weather.com/weather/tenday/l/Staten+Island+NY+USNY1401:1:US",\
		"https://weather.com/weather/tenday/l/Sunset+Park+USME1869:27:US",\
		"https://weather.com/weather/tenday/l/TWXX0021:1:TW",\
		"https://weather.com/weather/tenday/l/CAXX0504:1:CA",\
		"https://weather.com/weather/tenday/l/Tokyo+Japan+JAXX0085:1:JA",\
		"https://weather.com/weather/tenday/l/USDC0001:1:US",\
		"https://weather.com/weather/tenday/l/10701",\
		"https://weather.com/weather/tenday/l/Arcadia+CA+91007:4:US",\
		"https://weather.com/weather/tenday/l/91709:4:US",\
		"https://weather.com/weather/tenday/l/94538:4:US",\
		"https://weather.com/weather/tenday/l/Hayward+CA+94541:4:US",\
		"https://weather.com/weather/tenday/l/Irvine+CA+USCA0517:1:US",\
		"https://weather.com/weather/tenday/l/USCA0791:1:US",\
		"https://weather.com/weather/tenday/l/91761",\
		"https://weather.com/weather/tenday/l/USCA0840:1:US",\
		"https://weather.com/weather/tenday/l/Rowland+Heights+CA+USCA0961:1:US",\
		"https://weather.com/weather/tenday/l/USCA0993:1:US",\
		"https://weather.com/weather/tenday/l/San+Mateo+CA+94403:4:US",\
		"https://weather.com/weather/tenday/l/90503:4:US"
		]

name = ["Bangkok",\
		"Battery Park",\
		"Beijing",\
		"Boston",\
		"Central Park",\
		"Chicago",\
		"Elmhurst",\
		"Flushing",\
		"Hong Kong",\
		"Houston",\
		"Huntington",\
		"JFK",\
		"Las Vegas",\
		"London",\
		"Los Angeles",\
		"Miami",\
		"New York",\
		"Newark",\
		"Paris",\
		"Phoenix",\
		"Rome",\
		"San Francisco",\
		"Seoul",\
		"Shanghai",\
		"Singapore",\
		"Staten Island",\
		"Sunset Park",\
		"Taipei",\
		"Toronto",\
		"Tokyo",\
		"Washington DC",
		"Yonkers",\
		"Arcadia",\
		"Chino Hills",\
		"Fremont",\
		"Hayward",\
		"Irvine",\
		"Oakland",\
		"Ontario",\
		"Pasadena",\
		"Rowland Hts",\
		"San Jose",\
		"San Mateo",\
		"Torrance"
		]

#date
today = date.today()
d3 = today.strftime("%m-%d-%y")
print(d3)
filename = d3+".txt"
file = open(filename,'w+')

for n in range(44):

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
	if "sunny" in weather:
		outweather = "sunny"
	if "cloudy" in weather:
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
	file.write(str(temp[1])+'-'+str(temp[0]))	
	file.write("\n")

#close file
file.close()




