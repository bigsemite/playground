var cfg = {
    apiKey: "AIzaSyA55CXQUZE0qLaxRxwJSEcx2gDvbY38y9E",
    projectId: "setitchat"
};

firebase.initializeApp(cfg);
const fs = firebase.firestore();
var stringPic = "";

function saveit(){
    var ref = fs.collection("ACCOUNT");
    var refIncome = fs.collection("INCOME").doc("AMOUNT");
    var avail =0;
    refIncome.get().then(function(res){
        avail = res.data().AMOUNNT;
        avail = parseFloat(avail);
    });
    var t = item.value;
    var c = cost.value;
    var p = period.value;
    var r = receipt.value;
    if (t.length <1 || c.length < 1 || stringPic.length < 1){
        alert("Enter correct values");
        return;
    }
    ref.add({
        "ITEM": t,
        "COST": c,
        "PERIOD": p,
        "RECEIPT": stringPic


    }).then(function(){
        var nv = avail - parseFloat(c);
        refIncome.update({
            "AMOUNNT": nv
        }).then(()=>{
            alert("Saved Correctly \n new balance is " + nv);
        });
        
    });
}

function saveIncome(){
    var v = amt.value;
    var ref = fs.collection("INCOME").doc("AMOUNT");
    ref.set({
        "AMOUNNT": v
    }).then(function(){
        alert("Income Updated successfully");
    })
}

function reporting(){
    var ref = fs.collection("ACCOUNT");
    var refIncome = fs.collection("INCOME").doc("AMOUNT");
    var avail =0;
    refIncome.get().then(function(res){
        avail = res.data().AMOUNNT;
        var c, t, p;
        var sm = 0;
        bal.innerHTML = avail;
        ref.get().then(function(ans){
            ans.forEach(element => {
                t = element.data().ITEM;
                c = element.data().COST;
                p = element.data().PERIOD;
                sm = sm + parseFloat(c);
                updateTable(t,c,p, sm);

            });
        });
        
    });
    
}

function updateTable(t,c,p, sm){
    var h = "<tr><td>"+ p +"</td><td>" + t +"</td><td>"+ c + "</td><td>No Reciept</td>";
    tbl.innerHTML += h; 
    resA.innerHTML = sm;
}

function saveRcpt(){
    var a1 = receipt.files[0];
            console.log('file name', a1);
            pt = window.URL.createObjectURL(a1);
           
            var rr = new FileReader();
            console.log('path ', pt);
            //connvert
            
            rr.onloadend = ()=>{
                //alert("here");
                stringPic = rr.result;
                console.log("file equivalent", stringPic);
            }
            rr.readAsDataURL(a1);
}

