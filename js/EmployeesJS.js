const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
jQuery(document).ready(function(){
    new Employees()
})
// Class quan ly cac su kien cho employesss
 class Employees {
    constructor (){
        this.loadData()
    }
    // setDataUrl(){
    //     this.getDataUrl =  "http://cukcuk.manhnv.net/v1/Employees"
    // }
    // loadData(){
       
    // }
    loadData(){
        // con trỏ this
        var _this = this

        // check add or save
        
        // lấy mã nhân viên APi
        var EmployeeCode = '',DepartmentName ='',PositionName =''
        jQuery.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
            method : "GET"
        }).done(function(res){
           EmployeeCode = res
        }).fail(function(res){

        })

        // lấy các phòng viên APi
        jQuery.ajax({
            url : "http://cukcuk.manhnv.net/api/Department",
            method : "GET"
        }).done(function(res){
            // tạo combobox phòng ban cho form
            DepartmentName = res[0].DepartmentName;
            var listDepartmentName = ''
            jQuery.each(res,function(index,object){
                listDepartmentName += `
                <li class="dropdown-list__item dropdown-list__item-staff__room 
                ${index ===0 ? "dropdown-list__item-focus" : ""} ">
                    <i class="fas fa-check">
                    </i>
                    <span>
                    ${object.DepartmentName}
                    </span>
                    <span style="display: none"> ${object.DepartmentId} </span}
                </li>
                `
            })
            $('.dropdown-list__staff-room').innerHTML = listDepartmentName
        }).fail(function(res){

        })

        // lấy các vị trí APi
        jQuery.ajax({
            url : "http://cukcuk.manhnv.net/v1/Positions",
            method : "GET"
        }).done(function(res){
            // tạo combobox vị trí cho form
            PositionName = res[0].PositionName;
            var listPositionName = ''
            jQuery.each(res,function(index,object){
                listPositionName += `
                <li class="dropdown-list__item dropdown-list__item-staff__location 
                ${index ===0 ? "dropdown-list__item-focus" : ""}" ">
                    <i class="fas fa-check"></i>
                    <span>
                       ${object.PositionName}
                    </span>
                    <span style="display: none"> ${object.PositionId} </span}
                </li>
                `
            })
            $('.dropdown-list__staff-location').innerHTML = listPositionName
        }).fail(function(res){

        })


        // lấy danh sách nhân viên
        jQuery.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees",
            method : "GET"
        }).done(function(res){
            var html =' '
            var arrayRoom = []
            var arrayLocation = []
            var arrayEmployeeCode = []
            var arrayEmployeeID = []
            var arrayIdentityNumber = []
            jQuery.each(res,function(index,object){
                html = html + ` 
                <tr class="${(index%2)===0 ? "even" :''} staff-indexnformation__list-table">
                    <td class="content-table__column">${formatNull(object.EmployeeCode)}</td>
                    <td class="content-table__column">${formatNull(object.FullName)}</td>
                    <td class="content-table__column">${formatNull(object.GenderName)}</td>
                    <td class="content-table__column">${formatDate(object.DateOfBirth)}</td>
                    <td class="content-table__column">${formatNull(object.PhoneNumber)}</td>
                    <td class="content-table__column">${formatNull(object.Email)}</td>
                    <td class="content-table__column">${formatNull(object.PositionName)}</td>
                    <td class="content-table__column">${formatNull(object.DepartmentName)}</td>
                    <td class="content-table__column money">${formatMoney(object.Salary)}</td>
                    <td class="content-table__column">${formatNull(object.WorkStatus)}</td>
                </tr>`
                // Tim tat ca cac phong ban
                
                arrayRoom[index] = formatNull(object.DepartmentName)
                arrayLocation[index] = formatNull(object.PositionName)

                // Lấy ra các mã nhân viên
                arrayEmployeeCode[index]= formatNull(object.EmployeeCode)

                // Lấy ra các chứng minh thư
                arrayIdentityNumber[index]= formatNull(object.IdentityNumber)

                // Lấy ra id từng tr
                arrayEmployeeID[index] = object.EmployeeId

            })
            var contenttable = `
                <table >
                    <tr>
                        <th class="content-table__column">Mã nhân viên</th>
                        <th class="content-table__column">Họ và tên</th>
                        <th class="content-table__column">Giới tính</th>
                        <th class="content-table__column">Ngày sinh</th>
                        <th class="content-table__column">Điện thoại</th>
                        <th class="content-table__column">Email</th>
                        <th class="content-table__column">Chức vụ</th>
                        <th class="content-table__column">Phòng ban</th>
                        <th class="content-table__column money">Mức lương cơ bản</th>
                        <th class="content-table__column">Tình trạng công việc</th>
                        
                    </tr>
                    <tbody class="staffTable"> 
                    ${html}
                    </tbody>
                </table>`
            $('.content-table').innerHTML = contenttable

            // onclick sửa tt nhân viên
            $$('.staffTable tr').forEach((item,index)=>{
                 item.onclick =  function(e){
                    
                    // Lấy dữ liệu nhân viên theo id
                    jQuery.ajax({
                        url : `http://cukcuk.manhnv.net/v1/Employees/{${arrayEmployeeID[index]}}`,
                        method : "GET"
                    }).done(function(res){
                        
                        $('#EmployeeCode').value = res.EmployeeCode
                        $('#FullName').value = res.FullName

                        // xử lý hiển thị ngày sinh khi lấy dữ liệu từ Api
                        if(formatDate(res.DateOfBirth)){
                            $('#DateOfBirth').type = 'text'
                            $('#DateOfBirth').value = formatDate(res.DateOfBirth)
                        }
                        $('#DateOfBirth').oninput = function(){
                            $('#DateOfBirth').type ='date'
                        }
                        $('#GenderName').value = res.GenderName
                        $('#IdentityNumber').value = res.IdentityNumber

                        // xử lý hiển thị ngày cấp CMT  khi lấy dữ liệu từ Api
                        $('#PersonalTaxCode').value = res.PersonalTaxCode
                        if(formatDate(res.IdentityDate)){
                            $('#IdentityDate').type = 'text'
                            $('#IdentityDate').value = formatDate(res.IdentityDate)
                        }
                        $('#IdentityDate').oninput = function(){
                            $('#IdentityDate').type ='date'
                        }
                        $('#IdentityPlace').value = res.IdentityPlace
                        $('#Email').value = res.Email
                        $('#PhoneNumber').value = res.PhoneNumber

                        // xử lý hiển thị vị trí  khi lấy dữ liệu từ Api
                        $$('.dropdown-list__item-staff__location span:last-child').forEach((item,index)=>{
                            if(item.innerText.replaceAll(' ','').trim() === res.PositionId){
                                $('#PositionName').value=$$('.dropdown-list__item-staff__location')[index].innerText.trim().split('  ')[0]
                                $('.dropdown-list__item-staff__location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                                $$('.dropdown-list__item-staff__location')[index].classList.add('dropdown-list__item-focus')
                            }
                        })

                        // xử lý hiển thị phòng khi lấy dữ liệu từ Api
                        $$('.dropdown-list__item-staff__room span:last-child').forEach((item,index)=>{
                            if(item.innerText.replaceAll(' ','').trim() === res.DepartmentId){
                                $('#DepartmentName').value=$$('.dropdown-list__item-staff__room')[index].innerText.trim().split('  ')[0]
                                $('.dropdown-list__item-staff__room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                                $$('.dropdown-list__item-staff__room')[index].classList.add('dropdown-list__item-focus')
                            }
                        })

                        // xử lý hiển thị ngày vào công ti  khi lấy dữ liệu từ Api
                        $('#PersonalTaxCode').value = res.PersonalTaxCode
                        if(res.joinDate === undefined){
                            $('#JoinDate').type = 'text'
                            $('#JoinDate').value =''
                        }else if(formatDate(res.joinDate)){
                            $('#JoinDate').type = 'text'
                            $('#JoinDate').value = formatDate(res.joinDate)
                        }
                        
                        $('#JoinDate').oninput = function(){
                            $('#JoinDate').type ='date'
                        }
                        $('#Salary').value = formatMoney(res.Salary)
                        $('.staff-information').classList.remove('active')

                         // Xử lý sự kiện các ô input form khi save
            
                            Vadilator ({
                                form : '.form-staff',
                                formGroupSelector:'.form-group',
                                errorSelector : '.form-message',
                                submitBtn : '#button-save',
                                rules : [
                                Vadilator.isRequired('#EmployeeCode'),
                                Vadilator.isRequired('#FullName'),
                                Vadilator.isRequired('#Email'),
                                Vadilator.isRequired('#IdentityNumber'),
                                Vadilator.isRequired('#PhoneNumber'),
                                Vadilator.isEmail("#Email"),
                                
                                // Khi bị trùng mã nhân viên
                            
                                // Khi trùng cmt
                                // Vadilator.IdentityNumber('#IdentityNumber',function(){
                                //     var check ='';
                                //     for(var i=0;i<listArray(arrayIdentityNumber).length;i++){
                                //         if($('#IdentityNumber').value === listArray(arrayIdentityNumber)[i].toUpperCase()){
                                //             check = listArray(arrayIdentityNumber)[i];
                                //             break;
                                //         }
                                //     }
                                //     return check
                                // }),

                                // // Khi trùng mã nhân viên
                                // Vadilator.EmployeeCode('#EmployeeCode',function(){
                                //     var check ='';
                                //     for(var i=0;i<listArray(arrayEmployeeCode).length;i++){
                                //         if($('#EmployeeCode').value === listArray(arrayEmployeeCode)[i].toUpperCase()){
                                //             check = listArray(arrayEmployeeCode)[i];
                                //             break;
                                //         }
                                //     }
                                //     return check
                                // }),
                                ],
                                
                                onSubmit :  function(){
                                        var  object = {
                                            EmployeeCode: jQuery('#EmployeeCode').val(),
                                            FullName: jQuery('#FullName').val(),
                                            DateOfBirth: jQuery('#DateOfBirth').val(),
                                            Gender: $('.dropdown-list__item-boy.dropdown-list__item-focus span').innerText,
                                            IdentityNumber: jQuery('#IdentityNumber').val(),
                                            IdentityDate: jQuery('#IdentityDate').val(),
                                            IdentityPlace: jQuery('#IdentityPlace').val(),
                                            Email: jQuery('#Email').val(),
                                            PhoneNumber: jQuery('#PhoneNumber').val(),
                                            PositionId: $('.dropdown-list__item-staff__location.dropdown-list__item-focus span:last-child').innerText,
                                            DepartmentId: $('.dropdown-list__item-staff__room.dropdown-list__item-focus  span:last-child').innerText,
                                            PersonalTaxCode:  jQuery('#PersonalTaxCode').val(),
                                            Salary: Number(jQuery('#Salary').val().replaceAll('.','')),
                                            JoinDate: jQuery('#joinDate').val(),
                                            WorkStatus : 0
                                        }
                                        jQuery.ajax({
                                            
                                            method : 'PUT',
                                            url : `http://cukcuk.manhnv.net/v1/Employees/{${arrayEmployeeID[index]}}`,
                                            data : JSON.stringify(object),
                                            dataType: "json",
                                            contentType: "application/json"
                                        }).done(function(){
                                            _this.loadData()
                                            $('.staff-information').classList.add('active')
                                        }).fail(function(){
                                            
                                        })
                                }  
                            })
                    }).fail(function(res){
                    })

                }
            })




            // Xu ly du lieu dropdown phong ban
            var listDropDownRoom = ' '
            for(var i=0; i<listArray(arrayRoom).length;i++){
                listDropDownRoom = listDropDownRoom + `
                <li class="dropdown-list__item dropdown-list__item-room ">
                    <i class="fas fa-check"></i>
                    <span>
                        ${listArray(arrayRoom)[i]}
                    </span>
                </li>
                `
            }
            var dropDown__Room = ` 
                <input type="text" class="dropdown-room dropdown-input active" placeholder="Tất cả phòng ban" >
                <i class="fas fa-chevron-down dropdown-icon dropdown-icon__room"></i>
                <i class="fas fa-chevron-up dropup-icon dropup-icon__room active"></i>
                <ul class="dropdown-list dropdown-list__room">
                    <li class="dropdown-list__item dropdown-list__item-room  dropdown-list__item-focus">
                        <i class="fas fa-check"></i>
                        <span>
                            Tất cả phòng ban
                        </span>
                    </li>
                    ${listDropDownRoom}
                </ul>
            `
            $('.dropdown.dropdown__room').innerHTML = dropDown__Room


            // Xu lu dropdown vi tri
            
            var listDropDownLocation = ' '
            for(var i=0; i<listArray(arrayLocation).length;i++){
                
                listDropDownLocation = listDropDownLocation + `
                <li class="dropdown-list__item dropdown-list__item-location ">
                    <i class="fas fa-check"></i>
                    <span>
                        ${listArray(arrayLocation)[i]}
                    </span>
                </li>
                `
            }
            var dropDown__Location = ` 
            <input type="text" class="dropdown-location dropdown-input active" placeholder="Tất cả các vị trí">
                <i class="fas fa-chevron-down dropdown-icon dropdown-icon__location"></i>
                <i class="fas fa-chevron-up dropup-icon dropup-icon__location active"></i>
                <ul class="dropdown-list dropdown-list__location">
                    <li class="dropdown-list__item dropdown-list__item-location  dropdown-list__item-focus">
                        <i class="fas fa-check"></i>
                        <span>
                        Tất cả các vị trí
                        </span>
                    </li>
                    ${listDropDownLocation}
                </ul>
            `
            $('.dropdown.dropdown__location').innerHTML = dropDown__Location












            // HendelEvent
            const dropdown = $$('.dropdown');
            const dropdown_list = $$('.dropdown-list')
            const dropdown__room = $$('.dropdown-room')
            const dropdown__list__item__room =$$('.dropdown-list__item-room')
            const dropdown__location = $$('.dropdown-location')
            const dropdown__list__item__location =$$('.dropdown-list__item-location')
            const dropdown__boy = $$('.dropdown-boy')
            const dropdown__list__item__boy =$$('.dropdown-list__item-boy')
           
            // list room
            dropdown__list__item__room.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-room.dropdown-input').value = this.innerText
                    
                    var valueRoom = $('.dropdown-room.dropdown-input').value.toLowerCase();
                    var valueLocation = $('.dropdown-location.dropdown-input').value.toLowerCase();
                    if(valueLocation === 'Tất cả các vị trí'.toLowerCase() && valueRoom === 'Tất cả phòng ban'.toLowerCase()){
                        valueLocation = ''
                        valueRoom = ''
                    }
                    else if(valueRoom === 'Tất cả phòng ban'.toLowerCase()){
                        valueRoom = ''
                    } else if(valueLocation === 'Tất cả các vị trí'.toLowerCase()){
                        valueLocation = ''
                    } 
                    
                    jQuery('.staffTable tr').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(valueRoom)>-1
                        && jQuery(this).text().toLowerCase().indexOf(valueLocation)>-1);
                     });
                    e.preventDefault()
                }
            })
            // list location
            dropdown__list__item__location.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-location.dropdown-input').value = this.innerText
                    
                    
                    var valueRoom = $('.dropdown-room.dropdown-input').value.toLowerCase();
                    var valueLocation = $('.dropdown-location.dropdown-input').value.toLowerCase();
                    if(valueLocation === 'Tất cả các vị trí'.toLowerCase() && valueRoom === 'Tất cả phòng ban'.toLowerCase()){
                        valueLocation = ''
                        valueRoom = ''
                    }
                    else if(valueRoom === 'Tất cả phòng ban'.toLowerCase()){
                        valueRoom = ''
                    } else if(valueLocation === 'Tất cả các vị trí'.toLowerCase()){
                        valueLocation = ''
                    } 
                    jQuery('.staffTable tr').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(valueRoom)>-1
                        && jQuery(this).text().toLowerCase().indexOf(valueLocation)>-1);
                    });
                    e.preventDefault()
                }
            })
            
            // Onclick dropdown
            dropdown__list__item__boy.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-boy.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-boy.active').value = this.innerText
                    e.preventDefault()
                }
            })

            $$('.dropdown-list__item-staff__room').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-staff__room.active').value = this.innerText
                    e.preventDefault()
                }
            })
            $$('.dropdown-list__item-staff__location').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-staff__location.active').value = this.innerText
                    e.preventDefault()
                }
            })
            $$('.dropdown-list__item-staff__job').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__job.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-staff__job.active').value = this.innerText

                    e.preventDefault()
                }
            })
            // Exit
            $('.staff-information__header-img').onclick= function(e){
                $('.staff-information').classList.add('active')
                $$('.form-group.invalid').forEach((item,index) =>{
                    item.classList.remove('invalid')
                    $$('.form-message')[index].innerHTML = ''
                })
                e.preventDefault()
            }

            // Click hien thi form them nhan vien
            $('.content__action-button-btn ').onclick= async function(e){
                
                // Xóa dữ liệu form rồi làm gì thì làm
                jQuery('.form-staff input').val(null) 

                // Tạo các value cho input
                $('#EmployeeCode').value = EmployeeCode

                // thêm value cho combobox phòng ban
                $('.dropdown-staff__room').value = DepartmentName
                $('.dropdown-list__item-staff__room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                $$('.dropdown-list__item-staff__room')[0].classList.add('dropdown-list__item-focus')

                // thêm value cho combobox vị trí
                $('.dropdown-staff__location').value = PositionName
                $('.dropdown-list__item-staff__location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                $$('.dropdown-list__item-staff__location')[0].classList.add('dropdown-list__item-focus')

                // thêm value cho giới tính
                $('.dropdown-boy').value ='Nam'
                $('.dropdown-list__item-boy.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                $$('.dropdown-list__item-boy')[0].classList.add('dropdown-list__item-focus')


                // thêm value cho combobox tình trạng cv
                $('#WorkStatus').value = 'Đang làm việc'
                $('.dropdown-list__item-staff__job.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                $$('.dropdown-list__item-staff__job')[0].classList.add('dropdown-list__item-focus')
                
                // hiển thị form
                $('.staff-information').classList.remove('active')
                $$('.auto-focus__input').forEach((item,index)=>{
                    item.focus()
                })
               
                 // Xử lý sự kiện các ô input form
            
            Vadilator ({
                form : '.form-staff',
                formGroupSelector:'.form-group',
                errorSelector : '.form-message',
                submitBtn : '#button-save',
                rules : [
                Vadilator.isRequired('#EmployeeCode'),
                Vadilator.isRequired('#FullName'),
                Vadilator.isRequired('#Email'),
                Vadilator.isRequired('#IdentityNumber'),
                Vadilator.isRequired('#PhoneNumber'),
                Vadilator.isEmail("#Email"),
                
                // Khi bị trùng mã nhân viên
              
                // Khi trùng cmt
                Vadilator.IdentityNumber('#IdentityNumber',function(){
                    var check ='';
                    for(var i=0;i<listArray(arrayIdentityNumber).length;i++){
                        if($('#IdentityNumber').value === listArray(arrayIdentityNumber)[i].toUpperCase()){
                            check = listArray(arrayIdentityNumber)[i];
                            break;
                        }
                    }
                    return check
                }),

                // Khi trùng mã nhân viên
                Vadilator.EmployeeCode('#EmployeeCode',function(){
                    var check ='';
                    for(var i=0;i<listArray(arrayEmployeeCode).length;i++){
                        if($('#EmployeeCode').value === listArray(arrayEmployeeCode)[i].toUpperCase()){
                            check = listArray(arrayEmployeeCode)[i];
                            break;
                        }
                    }
                    return check
                }),
                ],
                
                onSubmit :  function(){
                        var  object = {
                            EmployeeCode: jQuery('#EmployeeCode').val(),
                            FullName: jQuery('#FullName').val(),
                            DateOfBirth: jQuery('#DateOfBirth').val(),
                            Gender: $('.dropdown-list__item-boy.dropdown-list__item-focus span').innerText,
                            IdentityNumber: jQuery('#IdentityNumber').val(),
                            IdentityDate: jQuery('#IdentityDate').val(),
                            IdentityPlace: jQuery('#IdentityPlace').val(),
                            Email: jQuery('#Email').val(),
                            PhoneNumber: jQuery('#PhoneNumber').val(),
                            PositionId: $('.dropdown-list__item-staff__location.dropdown-list__item-focus span:last-child').innerText,
                            DepartmentId: $('.dropdown-list__item-staff__room.dropdown-list__item-focus  span:last-child').innerText,
                            PersonalTaxCode:  jQuery('#PersonalTaxCode').val(),
                            Salary: Number(jQuery('#Salary').val().replaceAll('.','')),
                            JoinDate: jQuery('#joinDate').val(),
                            WorkStatus : 0
                        }
                        jQuery.ajax({
                            
                            method : 'POST',
                            url : 'http://cukcuk.manhnv.net/v1/Employees',
                            data : JSON.stringify(object),
                            dataType: "json",
                            contentType: "application/json"
                        }).done(function(){
                            _this.loadData()
                            $('.staff-information').classList.add('active')
                        }).fail(function(){
                            
                        })
                }  
            })
                e.preventDefault()
            }
            
            // Hủy form
            $('.button-cancel').onclick = function(e){
                $('.staff-information').classList.add('active')
                
                $$('.form-group.invalid').forEach((item,index) =>{
                    item.classList.remove('invalid')
                    $$('.form-message')[index].innerHTML = ''
                })
                e.preventDefault()
            }


            // tim kiem
            jQuery(document).ready(function() {
                // tim kiếm theo tên, mã nhân viên, sdt
                jQuery('.field__search ').on('keyup', function(e) {
                   e.preventDefault();
                   var value = jQuery(this).val().toLowerCase();

                   var valueRoom = $('.dropdown-room.dropdown-input').value.toLowerCase();
                   var valueLocation = $('.dropdown-location.dropdown-input').value.toLowerCase();

                    jQuery('.staffTable tr').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value)>-1 && 
                        jQuery(this).text().toLowerCase().indexOf(valueRoom)>-1 && 
                        jQuery(this).text().toLowerCase().indexOf(valueLocation)>-1);
                    });
                    
                });

                // Atuo tim kiem phong ban
                
                jQuery('.dropdown-room.dropdown-input').on('keyup',function(e){
                    e.preventDefault()
                    var value = jQuery(this).val().toLowerCase();
                    
                    jQuery('.dropdown-list__room .dropdown-list__item-room').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value)>-1);
                    });
                   
                    
                    $$('.staffTable tr td:nth-child(8)').forEach((tr,index)=>{
                        if(tr.innerText.toLowerCase().indexOf(value)>-1){
                            $$('.staffTable tr')[index].style.display = ''
                        }else{
                            $$('.staffTable tr')[index].style.display = 'none'
                            }
                    })
                    $('.dropdown.dropdown__room').classList.add('focus')
                })
              
                // Keydown Room
                
                var indexRoom= 0;
                var arrayKeydownRoom = []
                jQuery('.dropdown-room.dropdown-input').on("keydown",function(e){
                    var value = $('.dropdown-room.dropdown-input').value.toLowerCase();
                    var valueLocation = $('.dropdown-location.dropdown-input').value.toLowerCase();
                    arrayKeydownRoom = jQuery('.dropdown-list__room .dropdown-list__item-room').filter(function() {
                        return this.innerText.toLowerCase().indexOf(value) > -1
                    });
                    
                    if (e.keyCode == 40) {
                        indexRoom ++
                        if(indexRoom >=arrayKeydownRoom.length){
                            indexRoom = 0;
                        }
                        $('.dropdown-list__item-room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                        arrayKeydownRoom[indexRoom].classList.add('dropdown-list__item-focus')
                    }
                    else if (e.keyCode == 38) {
                        indexRoom--
                        if(indexRoom <0){
                            indexRoom = arrayKeydownRoom.length-1;
                        }
                        $('.dropdown-list__item-room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                        arrayKeydownRoom[indexRoom].classList.add('dropdown-list__item-focus')
                    }  
                    else if(e.keyCode ==13){
                        if(arrayKeydownRoom[indexRoom].innerText.toLowerCase() === 'Tất cả phòng ban'.toLowerCase()){
                            
                            $('.dropdown-room.dropdown-input').value = ''
                        }
                        else{
                            $('.dropdown-room.dropdown-input').value = arrayKeydownRoom[indexRoom].innerText
                        }
                    }
                    
                })
               
                // Auto tim kiem vi tri
                jQuery('.dropdown-location.dropdown-input.active').on('keyup',function(e){
                    e.preventDefault()
                    var value = jQuery(this).val().toLowerCase();
                    jQuery('.dropdown-list__location .dropdown-list__item-location').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value)>-1);
                    });
                   
                    
                    $$('.staffTable tr td:nth-child(7)').forEach((tr,index)=>{
                       if(tr.innerText.toLowerCase().indexOf(value)>-1){
                        $$('.staffTable tr')[index].style.display = ''
                       }else{
                        $$('.staffTable tr')[index].style.display = 'none'
                       }
                    })
                    $('.dropdown.dropdown__location').classList.add('focus')
                })

                // Keydown Location
                
                var indexLocation= 0;
                var arrayKeydownLocation = []
                jQuery('.dropdown-location.dropdown-input').on("keydown",function(e){
                    var value = $('.dropdown-location.dropdown-input').value.toLowerCase();
                    var valueRoom = $('.dropdown-room.dropdown-input').value.toLowerCase();
                    arrayKeydownLocation = jQuery('.dropdown-list__location .dropdown-list__item-location').filter(function() {
                        return this.innerText.toLowerCase().indexOf(value) > -1 
                    });
                    
                    if (e.keyCode == 40) {
                        indexLocation ++
                        if(indexLocation >=arrayKeydownLocation.length){
                            indexLocation = 0;
                        }
                        $('.dropdown-list__item-location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                        arrayKeydownLocation[indexLocation].classList.add('dropdown-list__item-focus')
                    }
                    else if (e.keyCode == 38) {
                        indexLocation--
                        if(indexLocation <0){
                            indexLocation = arrayKeydownLocation.length-1;
                        }
                        $('.dropdown-list__item-location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                        arrayKeydownLocation[indexLocation].classList.add('dropdown-list__item-focus')
                    }  
                    else if(e.keyCode ==13){
                        if(arrayKeydownLocation[indexLocation].innerText.toLowerCase() === 'Tất cả phòng ban'.toLowerCase()){
                            
                            $('.dropdown-location.dropdown-input').value = ''
                        }
                        else{
                            $('.dropdown-location.dropdown-input').value = arrayKeydownLocation[indexLocation].innerText
                        }
                    }
                    
                })
               
                // 
            });
            // Onclick dropdown
            let click = [];
            for(let i=0;i<dropdown.length;i++){
                click[i]=0
            }
            dropdown.forEach((down,index)=>{
                down.onclick = function(e){
                    dropdown_list[index].classList.add('active')
                    $$('.dropdown-icon')[index].classList.add('active')
                    $$('.dropup-icon')[index].classList.remove('active')
                }
            })
            
            // Click Windown
                jQuery(window).on("click.Bst", function(event){	
                        var itemClickWindown = ['room','location','boy','staff-location','staff-room','staff-job']	
                        for(var i=0;i<itemClickWindown.length;i++){
                            if ( 
                                jQuery(`.dropdown__${itemClickWindown[[i]]}`).has(event.target).length == 0 
                                &&
                                !jQuery(`.dropdown__${itemClickWindown[[i]]}`).is(event.target) 
                                ){
                                    $(`.dropdown-list__${itemClickWindown[[i]]}`).classList.remove('active')
                                    $(`.dropdown__${itemClickWindown[[i]]}`).classList.remove('focus')
                                    $(`.dropdown-icon__${itemClickWindown[[i]]}`).classList.remove('active')
                                    $(`.dropup-icon__${itemClickWindown[[i]]}`).classList.add('active')
                                } else {
                                    $(`.dropdown-list__${itemClickWindown[[i]]}`).classList.add('active')
                                    $(`.dropdown__${itemClickWindown[[i]]}`).classList.add('focus')
                                }
                        }
                        
                });

            
            // Xử lý viết format tiền lương trong form
            $('#Salary').oninput = function(e){
                $('#Salary').value = $('#Salary').value.replaceAll('.','').replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")
            }
           
            
        }).fail(function(res){
    
        })
    }

   
}
// Ham hien thi ngay thang
function formatDate(date){
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
function formatMoney(money){
    if(money === null){
        return ''
    }
    else{
        var num = money.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")
        return num
    }
}

// Ham hien thi null
function formatNull(value){
    if(value == 'null'.toLowerCase() || value == undefined){
        return ''
    }
    else return value
}

// Xu lý mang bị trùng

function listArray(arr){
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

function formatEmployeeCode(value){
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


// Khi cuộn table

$('.content-table').onscroll = function(e){
   if($('.content-table').scrollTop >=40 ){
       $('.delete-scroll').style.display = 'none'
   }
   else $('.delete-scroll').style.display = ''
}


// Xử lý format tiền khi nhập 
