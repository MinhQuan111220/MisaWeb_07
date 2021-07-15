const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Dropdown
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

// list staff

let html = '';
for(var i=0 ;i<1000;i++){
    html = html + ` 
    <tr class="${(i%2)===0 ? "even" :''} staff-information__list-table">
        <td class="content-table__column">MF${400+i}</td>
        <td class="content-table__column">Phạm Vũ Minh Quân</td>
        <td class="content-table__column">Nam</td>
        <td class="content-table__column">11/12/2000</td>
        <td class="content-table__column">0354992794</td>
        <td class="content-table__column">quan11122000@gmail.com</td>
        <td class="content-table__column">Fresher Web</td>
        <td class="content-table__column">Phòng Sản Xuất</td>
        <td class="content-table__column money">1000</td>
        <td class="content-table__column">Thực Tập</td>
    </tr>`
}
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
        ${html}
    </table>`
$('.content-table').innerHTML = contenttable

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