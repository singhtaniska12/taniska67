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
//fs.cp("./abes.txt","./a1.txt",()=>{})
//fs.appendFile("./a1.txt", " Welcome to A1 batch!", (err) => {
   // if (err) {
   //     console.log(err);
 //   } else {
  //      console.log("File appended successfully!");
  //  }
//});
const os=require('os');
console.log("system platform",os.platform());
console.log("user info",os.userInfo());
console.log("cpu",os.arch());
console.log("free memory",os.freemem());
console.log("total memory",os.totalmem());
console.log("uptime",os.uptime());
console.log("home directory",os.homedir()); 
console.log("hostname",os.hostname());
