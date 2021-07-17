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
            var dropDownRoom_Input = ' '
            var listDropDownRoom = ' '
            for(var i=0; i<listDropdown(arrayRoom).length;i++){
                dropDownRoom_Input = dropDownRoom_Input + 
                `<input type="text" class="dropdown-room dropdown-input" value="${listDropdown(arrayRoom)[i]}">`
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
                <input type="text" class="dropdown-room dropdown-input active" value="Tất cả phòng ban">
                ${dropDownRoom_Input}
                <i class="fas fa-chevron-down dropdown-icon"></i>
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
            var dropDownLocation_Input = ' '
            var listDropDownLocation = ' '
            for(var i=0; i<listDropdown(arrayLocation).length;i++){
                dropDownLocation_Input = dropDownLocation_Input + 
                `<input type="text" class="dropdown-location dropdown-input" value="${listDropdown(arrayLocation)[i]}">`
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
                <input type="text" class="dropdown-location dropdown-input active" value="Tất cả các vị trí">
                ${dropDownLocation_Input}
                <i class="fas fa-chevron-down dropdown-icon"></i>
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













            const dropdown = $$('.dropdown');
            const dropdown_list = $$('.dropdown-list')
            const dropdown__room = $$('.dropdown-room')
            const dropdown__list__item__room =$$('.dropdown-list__item-room')
            const dropdown__location = $$('.dropdown-location')
            const dropdown__list__item__location =$$('.dropdown-list__item-location')
            const dropdown__boy = $$('.dropdown-boy')
            const dropdown__list__item__boy =$$('.dropdown-list__item-boy')
            let click = [];
            for(let i=0;i<dropdown.length;i++){
                click[i]=0
            }

            dropdown.forEach((down,index)=>{
                down.onclick = function(e){
                    if(index===0 || index){
                        click[index]++;
                        if(click[index]===1){
                            this.classList.add('focus')
                            dropdown_list[index].classList.add('active')
                        }
                        else{
                            this.classList.remove('focus')
                            dropdown_list[index].classList.remove('active')
                            click[index]=0
                        }
                    }
                    e.preventDefault()
                }
            })

            // list room
            dropdown__list__item__room.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-room.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-room.active').classList.remove('active')
                    dropdown__room[index].classList.add('active')
                    
                    e.preventDefault()
                }
            })
            // list location
            dropdown__list__item__location.forEach((item,index)=>{
                item.onclick=function(e){
                    $('.dropdown-list__item-location.dropdown-list__item-focus').classList.remove('dropdown-list__item-focus')
                    this.classList.add('dropdown-list__item-focus')
                    $('.dropdown-location.active').classList.remove('active')
                    dropdown__location[index].classList.add('active')
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
                jQuery('.field__search ').on('keyup', function(e) {
                   e.preventDefault();
                   /* Act on the event */
                   var tukhoa = jQuery(this).val().toLowerCase();
                   jQuery('.staffTable tr').filter(function() {
                      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(tukhoa)>-1);
                   });
                });

                jQuery('.dropdown-input').on('keyup',function(e){
                    e.preventDefault()
                    var tukhoa = jQuery(this).val().toLowerCase();
                    jQuery('.dropdown-list__room .dropdown-list__item-room').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(tukhoa)>-1);
                    });
                    jQuery('.staffTable tr').filter(function() {
                        jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(tukhoa)>-1);
                     });
                    jQuery('.dropdown.dropdown__room').classList.add('focus')
                })
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


