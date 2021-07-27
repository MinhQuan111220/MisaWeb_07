
// jQuery(document).ready(function(){
//     new BaseJS()
// })
class BaseJS extends Format{
    constructor (){
        super()
    }
    // em dung ham chung goi dc tbody nha
    // lấy dữ liệu chung
    static async  loadData(){
        try {
            await jQuery.ajax({
                url : "http://cukcuk.manhnv.net/v1/Employees",
                method : "GET"
            }).done(function(res){
                // Xử lý dữ liệu 
                let intities = res
                
                // Duyệt từng đối tượng có trong mảng dữ liệu
               
                intities.forEach(entity =>{
                    // Xác định cột dữ liệu bao nhiêu cột
                    let colums = document.querySelectorAll('.content-table table thead th')
                    
                    // Xác định xem dữ liệu mỗi cột sẽ tương ứng với dữ liệu nào
                    let trHTML = jQuery('<tr></tr>')
                    colums.forEach((i,col)=>{
                        let tdHTML = jQuery('<td></td>')
                        const propName = jQuery(i).attr('prop-name')
                        let value = entity[propName]

                        const formatType = jQuery(i).attr('format')
                        switch (formatType) {
                            case 'date':
                                value = Format.formatDate(value)
                                break;
                            case '$':
                                value = Format.formatMoney(value)
                            default:
                                value = Format.formatNull(value)
                                break;
                        }
                        tdHTML.append(value)
                        trHTML.append(tdHTML)
                    })
                    jQuery('tbody').append(trHTML)
                })
            }).fail(function(res){

            })
        } catch (error) {
            console.log(error)
        }
    }

    // Xóa dữ liệu theo id 
    static delete(api,exit){
        var _this=this
        return jQuery.ajax({
            url : `http://cukcuk.manhnv.net/v1/${api}`,
            method : "DELETE"
        }).done(function(res){
            exit.style.display = 'none'
        }).fail(function(res){
            switch (res.status) {
        case 500:
            console.log('Có lỗi từ server, vui lòng thử lại');
            break;
        case 400:
            console.log('Dữ liệu không hợp lệ');
            break;
        default:
            break;
            }
        })
    }
}

