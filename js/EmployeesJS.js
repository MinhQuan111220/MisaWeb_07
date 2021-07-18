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
        jQuery.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees",
            method : "GET"
        }).done(function(res){
            var html =' '
            var arrayRoom = []
            var arrayLocation = []
            jQuery.each(res,function(index,object){
                html = html + ` 
                <tr class="${(index%2)===0 ? "even" :''} staff-indexnformation__list-table">
                    <td class="content-table__column">${object.EmployeeCode}</td>
                    <td class="content-table__column">${object.FullName}</td>
                    <td class="content-table__column">${object.GenderName}</td>
                    <td class="content-table__column">${formatDate(object.DateOfBirth)}</td>
                    <td class="content-table__column">${object.PhoneNumber}</td>
                    <td class="content-table__column">${object.Email}</td>
                    <td class="content-table__column">${object.QualificationName}</td>
                    <td class="content-table__column">${object.PositionName}</td>
                    <td class="content-table__column money">${formatMoney(object.Salary)}</td>
                    <td class="content-table__column">${object.WorkStatus}</td>
                </tr>`
                // Tim tat ca cac phong ban
                arrayRoom[index] = object.PositionName
                arrayLocation[index] = object.QualificationName
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

            // Xu ly du lieu dropdown phong ban
            var listDropDownRoom = ' '
            for(var i=0; i<listDropdown(arrayRoom).length;i++){
                listDropDownRoom = listDropDownRoom + `
                <li class="dropdown-list__item dropdown-list__item-room ">
                    <i class="fas fa-check"></i>
                    <span>
                        ${listDropdown(arrayRoom)[i]}
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
            for(var i=0; i<listDropdown(arrayLocation).length;i++){
                
                listDropDownLocation = listDropDownLocation + `
                <li class="dropdown-list__item dropdown-list__item-location ">
                    <i class="fas fa-check"></i>
                    <span>
                        ${listDropdown(arrayLocation)[i]}
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
                    if(valueRoom === 'Tất cả phòng ban'.toLowerCase()){
                        valueRoom = ''
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
                    if(valueLocation === 'Tất cả các vị trí'.toLowerCase()){
                        valueLocation = ''
                        valueLocation = ''
                    }
                    jQuery('.staffTable tr').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(valueRoom)>-1
                        && jQuery(this).text().toLowerCase().indexOf(valueLocation)>-1);
                    });
                    e.preventDefault()
                }
            })
            // list boy
            dropdown__list__item__boy.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-boy.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-boy.active').classList.remove('active')
                    dropdown__boy[index].classList.add('active')
                    e.preventDefault()
                }
            })

            // Load Data



            $$('.dropdown-list__item-staff__room').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-staff__room.active').classList.remove('active')
                    $$('.dropdown-staff__room')[index].classList.add('active')
                    e.preventDefault()
                }
            })
            $$('.dropdown-list__item-staff__location').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-staff__location.active').classList.remove('active')
                    $$('.dropdown-staff__location')[index].classList.add('active')
                    e.preventDefault()
                }
            })
            $$('.dropdown-list__item-staff__job').forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-staff__job.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('dropdown-staff__job.active').classList.remove('active')
                    $$('dropdown-staff__job')[index].classList.add('active')
                    e.preventDefault()
                }
            })
            // Exit
            $('.staff-information__header-img').onclick= function(e){
                $('.staff-information').classList.add('active')
                e.preventDefault()
            }


            $('.content__action-button-btn ').onclick=function(e){
                $('.staff-information').classList.remove('active')
                e.preventDefault()
            }

            // tim kiem
            jQuery(document).ready(function() {
                // tim kiếm theo tên, mã nhân viên, sddt
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
        return null
    }
    else{
        var num = money.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")
        return num
    }
}

// Xu ly dropdown

function listDropdown(arr){
    let isExist = (arr, x) => arr.indexOf(x) > -1;
    let ans = [];

    arr.forEach(element => {
        if(!isExist(ans, element)) ans.push(element);
    });

    return ans;
}


