
jQuery(document).ready(function(){
    new BaseJS()
})
class BaseJS{
    constructor (){
        this.getDataUrl = null;
        // this.setDataUrl()
        this.loadData()
    }
    // setDataUrl(){

    // }
    loadData(){
        var columns = jQuery(`table thead th`)
        var fieldNames = [];
        var getDataUrl = this.getDataUrl
        // Lấy thông tin dữ liệu tương ứng sẽ map 
        jQuery.each(columns, function(index,item){
            var fieldName = jQuery(item).attr('fieldname')
        })
        jQuery.ajax({
            url : getDataUrl,
            method : "GET"
        }).done(function(res){
            jQuery.each(res,function(index,object){
                var tr = jQuery(`<tr></tr>`)
                jQuery.each(columns,function(index,item){
                    var td = jQuery(`<td><div><span></span></div></td>`)
                    var fieldNames = jQuery(item).attr('fieldname')
                    var value = object[fieldName]
                    td.append(value)
                    jQuery('tr').append(td);
                })
                
                jQuery('table tbody').append(tr)
            })
        }).fail(function(res){
    
        })
    }
}

