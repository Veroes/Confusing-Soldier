import time

def inputValues(arrayOfSoldier, n):
	for i in range(n):
		soldierName = input('Soldier name : ')
		soldierCP = int(input('Solder Cp : '))
		arrayOfSoldier.append({'soldierName' : soldierName, 'soldierCP' : soldierCP})


def Replace(arrayOfSoldier,i):
	arrayOfSoldier[i]['soldierCP']=0
	if i==0:
		arrayOfSoldier[i+1]['soldierCP']=0
	elif i+1==len(arrayOfSoldier):
		arrayOfSoldier[i-1]['soldierCP']=0
	else:
		arrayOfSoldier[i-1]['soldierCP']=0
		arrayOfSoldier[i+1]['soldierCP']=0
	return arrayOfSoldier

def cekMax(arrayOfSoldier,n):
	if n==1:
		return 0
	else:
		listCP = [soldiers['soldierCP'] for soldiers in arrayOfSoldier]
		maxIndex = listCP.index(max(listCP))
		return maxIndex

def cekArray(arrayOfSoldier):
	for i in range (len(arrayOfSoldier)):
		if arrayOfSoldier[i]['soldierCP']!=0:
			return True
	return False

def nilaitotal(arrayOfSoldier,n):
	arrayOfHasil=list()
	total=0
	while cekArray(arrayOfSoldier):
		i= cekMax(arrayOfSoldier,n)
		arrayOfHasil.append({'soldierName' : arrayOfSoldier[i]['soldierName'], 'soldierCP' : arrayOfSoldier[i]['soldierCP']})
		total += arrayOfSoldier[i]['soldierCP']
		arrayOfSoldier = Replace(arrayOfSoldier,i)
	return total,arrayOfHasil

def main():
	arrayOfSoldier = list()
	n = int(input('Masukkan banyak data : '))
	inputValues(arrayOfSoldier, n)
	start_time = time.time()
	total,arrayOfHasil = nilaitotal(arrayOfSoldier,n)
	print("Total : ",total)
	print("--- %s seconds ---" % (time.time() - start_time))
	for i in range(len(arrayOfHasil)):
		print(arrayOfHasil[i]['soldierName'], ":", arrayOfHasil[i]['soldierCP'])

if __name__ == '__main__':
	main()