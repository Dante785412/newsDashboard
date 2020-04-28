



let ladungsliste = [
    [800,lkw_num,"276201"],
    [900,lkw_num,"276196"],
    [800,lkw_num, "276198"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276201"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276198"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [500,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [600,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [600,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    [800,lkw_num,"276196"],
    [600,lkw_num,"276196"],
    [700,lkw_num,"276196"],
    [500,lkw_num,"276196"],
    [900,lkw_num,"276196"],
    ];

    let maxAnzahlPaletten = 1;
    var lkw_num = 1;
    var nutzlast_kg = ladungsliste[0][0];
    var einenull = "0";




function erstelleLadungsliste(){



    for(let i = 0; i< ladungsliste.length; i++){
            console.log(einenull + maxAnzahlPaletten + ".     Gewicht der Palette in kg: " + ladungsliste[i][0] + 
            '        LKW-Nr.: ' + lkw_num + '         Palette-Nr: ' + ladungsliste[i][2] + "       Gewicht: " + nutzlast_kg + " kg"); 

            maxAnzahlPaletten += 1 ;
            akt_gewicht = ladungsliste[i][0];
            nutzlast_kg = nutzlast_kg + akt_gewicht;
    
        if(nutzlast_kg > 7500 || maxAnzahlPaletten >= 17) {
            console.log('\n');
            lkw_num ++;
            nutzlast_kg = ladungsliste[i][0];
            maxAnzahlPaletten = 1 ;
        }
        
        if (maxAnzahlPaletten >= 10) {
            einenull = "";
        }
    }

}


//erstelleLadungsliste();