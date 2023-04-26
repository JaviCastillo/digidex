let digimonList = [];
let digimonName = [];
let n = 0;


$(document).ready(function () {

    let digiDisplay = (n) => {
        $('#digiImg').css('opacity', 0);
        $('#digiImg').attr('src', digimonList[n].img);
        $('#digiImg').css('opacity', 1);
        $('.digiName').text(`${digimonList[n].name}`);
        $('.digiLvl').text(digimonList[n].level);
    }

    fetch('https://digimon-api.vercel.app/api/digimon')
    .then((e) => e.json())
    .then((d) => {
        digimonList = d;
        d.forEach(e => {
            digimonName[n] = e.name;
            n++;
        });
        for (var i = 0; i < digimonName.length; i++) {
            $('.dropdown-menu').append(`<li><a class="dropdown-item" href="#" id="${i}">${i+1} - ${digimonName[i]}</a></li>`);
        }
        digiDisplay(0);
    })

    $('#drop-input').keyup(()=>{
        let match = $('#drop-input').val();
        let matchArray = []
        for (var i = 0; i < digimonName.length; i++) {
            let formato = `${i+1} - ${digimonName[i]}`
            if(formato.toLowerCase().includes(match.toLowerCase())){
                matchArray.push({id: i, name: digimonName[i]});
            }
        };
        $('.dropdown-menu').empty();
        for (var i = 0; i < matchArray.length; i++) {
            $('.dropdown-menu').append(`<li><a class="dropdown-item" href="#" id="${matchArray[i].id}">${matchArray[i].id+1} - ${matchArray[i].name}</a></li>`);
        };
    })


    $('.dropdown-menu').click((e)=>{
        let num = parseInt($(e.target).attr('id'))
        digiDisplay(num)
        $('#drop-input').val(`${num+1} - ${digimonName[num]}`)
        $('.dropdown-menu').removeClass('show');
    })


    $('#drop-input').keydown((e)=>{
       $('.dropdown-menu').addClass('show');
        if(e.key == 'ArrowDown'){
            $('.dropdown-menu > li:first-child > a:first-child').focus();
        }
    })
    




    

    


    $('#searchBtn').click((e) => {
        e.preventDefault();
        let num = $('#searchVal').val() - 1;
        digiDisplay(num)
    });

});