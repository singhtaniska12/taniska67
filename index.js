const fs=require('fs');
//fs.writeFileSync('ABES.txt','we are code ',()=>{});
//const result=fs.readFileSync('./ABES.txt','utf-8', (err,data)=>{
 //   if(err){
  //  console.log("error",err);
//}
//else{
 //   console.log(result);

//}
//});
//fs.appendFileSync("./ABES.txt", 'Taniska', ()=>{});
fs.cp("./abes.txt","./a1.txt",()=>{})
