def inputValues(arrayOfSoldier, n):
    arrayOfSoldier.append({'soldierName' : "", 'soldierCP' : 0})
    for i in range(1,n):
        soldierName = input('Soldier name : ')
        soldierCP = int(input('Solder Cp : '))
        arrayOfSoldier.append({'soldierName' : soldierName, 'soldierCP' : soldierCP})

def coinRow(arrayOfSoldier,n):
    F = []
    F.append(arrayOfSoldier[0]['soldierCP'])
    F.append(arrayOfSoldier[1]['soldierCP'])
    for i in range(2,n):
        F.append(max(F[i-1], F[i-2]+arrayOfSoldier[i]['soldierCP']))
    return F

def pilihan(F,arrayOfSoldier):
    pilih=list()

    x=len(F)-1
    while x>=0:
        if F[x]>F[x-1]:
            pilih.append({'soldierName' : arrayOfSoldier[x]['soldierName'], 'soldierCP' : arrayOfSoldier[x]['soldierCP']})
            x-=2
        else:
            x-=1
    return pilih

def main():
    arrayOfSoldier = list()
    n = int(input('Masukkan banyak data : '))
    n=n+1
    inputValues(arrayOfSoldier, n)
    F=coinRow(arrayOfSoldier,n)
    print("Total power : ",F[-1])
    pilih = pilihan(F,arrayOfSoldier)
    print("Daftar yang terpilih : ")
    for i in range(len(pilih)):
        print(pilih[i]['soldierName'], " ; ", pilih[i]['soldierCP'])



if __name__ == '__main__':
    main()


#for j in range(len(arrayOfSoldier)):
#    print(arrayOfSoldier[j].name, " ", arrayOfSoldier[j].combatPower)
