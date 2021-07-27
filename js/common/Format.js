jQuery(document).ready(function(){
    new Format()
})


class Format{
    
    constructor(value){
       
    }


    // Hàm hiển thị tiền
     static salaryFormat(salary) {
        var result = '';
        if (salary != null) {
            for (var i = String(salary).length; i > 0; i = i - 3) {
                if (i > 3) {
                    var number = String(salary).slice(i - 3, i);
                    result += number.split("").reverse().join("") + ".";
                } else {
                    var number = String(salary).slice(0, i);
                    result += number.split("").reverse().join("");
                }
            }
            return result.split("").reverse().join("");
        } else return '';
    }
    
    
    
    // Ham hien thi ngay thang
    static formatDate(date){
        var date = new Date(date);
        if(date.getTime()==NaN){
            return " ";
        }
        else{
            var day = date.getDate(),
            month = date.getMonth() +1,
            year = date.getFullYear();
            
            day = day<10 ? '0'+day : day
            month = month<10 ? '0'+month : month
            return day + '/'+month+'/'+year
        }
    }
    
    // Ham hien thi tien
    static formatMoney(money){
        if(money === null){
            return ''
        }
        else{
            var num = money.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")
            return num
        }
    }
    
    // Ham hien thi null
    static formatNull(value){
        if(value == 'null'.toLowerCase() || value == undefined){
            return ''
        }
        else return value
    }
    
    // Xu lý mang bị trùng
    
    static listArray(arr){
        let isExist = (arr, x) => arr.indexOf(x) > -1;
        let ans = [];
    
        arr.forEach(element => {
            if(element !==''){
                if(!isExist(ans, element)) ans.push(element);
            }
        });
    
        return ans;
    }
    
    // Xử lý hiển thị mã nhân viên
    
    static formatEmployeeCode(value){
        if(value === '') return ''
        
        var number = 0;
        for(var i=2;i<value.length;i++){
            number = number*10 + Number(value[i])
        }
        number = number +1
        var stringNumber = '';
        for(var i=0;i<6-String(number).length;i++){
            stringNumber += '0'
        }
        return stringNumber + number
    }


    static pages (lengths,listpage){
        var page
        if(lengths/listpage===0){
            page=lengths/listpage
        }else{
            page=Math.floor(lengths/listpage)+1
        }
        return page
    }

    static showTableByDropDown(valueDropDown1,valueDropDown2,string1,string2){
                if(valueDropDown1 === string1.toLowerCase() && valueDropDown2 === string2.toLowerCase()){
                    valueDropDown1 = ''
                    valueDropDown2 = ''
                }
                else if(valueDropDown2 === string2.toLowerCase()){
                    valueDropDown2 = ''
                } else if(valueDropDown1 === string1.toLowerCase()){
                    valueDropDown1 = ''
                } 
                
                jQuery('.staffTable tr').filter(function() {
                    jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(valueDropDown2)>-1
                    && jQuery(this).text().toLowerCase().indexOf(valueDropDown1)>-1);
                 });
               
    }
}