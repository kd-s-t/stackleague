function nature_lover(up_speed, down_speed, target_height) {
    let height_now = 0
    let day = 0
    while(height_now <= target_height){
      console.log("------------------newday------------------");
      day++
      height_now = height_now + up_speed
      height_now = height_now - down_speed
      console.log("day",day);
      console.log("height_now",height_now);
      console.log("target_height",target_height);
      if(height_now===target_height){
        console.log("break");
        break
      }
      if(height_now>target_height){
        console.log("goback");
        day--
      }
    }
    
    return day
}
console.log(nature_lover(100,10,910)); // result: 10
// console.log(nature_lover(5, 2, 19)); // result: ?
// console.log(nature_lover(8, 7, 23)); // result: 10
// console.log(">>>>>result: ",nature_lover(14, 7, 28)); // result: ?
// console.log(nature_lover(3, 1, 10)); // result: ?
