// APP CONSTRUCTOR
function App() {

    // all our lets
    let _pixel,
        _pixelsContainer,
        _quantity,
        _database,
        _saveCharacter,
        _showCharacters,
        _gallery,
        _interval,
        _status;


    // initializing all whats needed in the right order
    function init() {

        _database = firebase.database();
        _ref = _database.ref().child('characters');

        _selected = false;
        _arr = [];
        _interval = 0;

        // cache dom elements
        _pixelsContainer = document.querySelector('.container');
        _saveCharacter = document.querySelector('.save');
        _showCharacter = document.querySelector('.gallery');
        _gallery = document.querySelector('.galleryContainer');
        _quantity = 8;

        createCharacterMatrix();
    }



    // create the interface to fill boxes to create a character
    function createCharacterMatrix() {
        _selected = true;
        let tempStr = '';

        for (let j = 0; j < _quantity; j++) {
            tempStr += '<div class="pixels" style="background-color: rgb(255, 255, 255);">';

            for (let i = 0; i < _quantity; i++) {
                tempStr += `<div class="pixelSelected"  style="background-color: rgb(0, 0, 0);"></div>`;
            }
            tempStr += '</div>'

        }
        _pixelsContainer.innerHTML = tempStr;

        pixelEvent(_selected);
    }

    function pixelEvent(_selected) {
        // add eventlistener to each pixel
        _pixel = document.querySelectorAll('.pixelSelected')
        for (let i = 0; i < _pixel.length; i++) {
            _pixel[i].addEventListener("click", function (event) {
                selected(_pixel[i]);
                updateCharacter(_selected);
            })
        }
        updateCharacter(_selected);
    }



    // function to colour/uncolour a pixel with a random colour
    function selected(item) {
        if (!item.style.backgroundColor || item.style.backgroundColor == "rgb(0, 0, 0)") {
            item.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        } else {
            item.style.backgroundColor = "rgb(0, 0, 0)";
        }
    }

    function saveCharacter(_selected, _arr) {
        if (_selected == true) {
            // console.log(_arr)
            _ref.update({
                selected: _arr,
            });
        } else {
            _ref.push().set(_arr);
            alert('Your character has been saved!');
            location.reload();
        }
    }

    // update the status of the chracter the person is currently working on, and also save it when done by pressing on save
    function updateCharacter(selected) {
        if (document.querySelector(".container").childNodes) {

            const arr = [];

            // Get the background colors from the elements and push them as pixel with x,y in an array
            for (var i = 0; i < document.querySelector(".container").childNodes.length; i++) {
                if (document.querySelector(".container").childNodes[i].tagName == "DIV") {
                    const p = document.querySelector(".container").children[i].style.backgroundColor;
                    // console.log('line:' + [i]);

                    for (var j = 0; j < document.querySelector(".container").childNodes[i].childNodes.length; j++) {
                        if (document.querySelector(".container").childNodes[i].childNodes[j].children) {
                            arr.push(document.querySelector(".container").childNodes[i].childNodes[j].style.backgroundColor);
                        }
                    }
                }
            }
            saveCharacter(selected, arr)
        } else {
            console.log('No pixels were found!');
        }
    }

    function updatePixel() {
        // update the selected character in database
        character = document.querySelectorAll('.character');

        for (var i = 0; i < character.length; i++) {
            character[i].addEventListener('click', function () {
                _id = this.id
                _selected = true;
                _ref.on("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        if (childSnapshot.key == _id) {
                            tempStr2 = '';

                            let x = 0;

                            for (var i = 0; i < 8; i++) {
                                // console.log('1:' + x);
                                tempStr2 += `<div class="pixels" id= 's' style="background-color: rgb(255, 255, 255);">`

                                for (var j = 0; j < 8; j++) {
                                    // console.log('2:' + x);
                                    // console.log('1:' + childSnapshot.val()[j])
                                    tempStr2 += `<div class="pixelSelected" style="background-color:  ${childSnapshot.val()[x]};"></div>`
                                    x++
                                }
                                tempStr2 += `</div>`
                            }
                            _pixelsContainer.innerHTML = tempStr2;

                            _pixel = document.querySelectorAll('.pixelSelected')

                            for (let i = 0; i < _pixel.length; i++) {
                                _pixel[i].addEventListener("click", function (event) {
                                    selected(_pixel[i]);
                                })
                            }
                        }
                    })
                })
                pixelEvent(_selected);
            }, false);
        }
    }


    // save character to the database                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    document.querySelector('.save').addEventListener('click', function () {
        _selected = false;
        updateCharacter(_selected);
    })



    // gallery of the saved characters
    document.querySelector('.gallery').addEventListener('click', function () {
        tempStr = '<h3>Previously saved characters</h3>';
        _database.ref().child('characters').on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                // takes the character from db and then show it in our gallery
                tempStr += `<div class="character" id='${childSnapshot.key}'>`
                let x = 0;

                for (var i = 0; i < 8; i++) {
                    // console.log('1:' + x);
                    tempStr += `<div class="pixels" id= 's' style="background-color: rgb(255, 255, 255);">`

                    for (var j = 0; j < 8; j++) {
                        // console.log('2:' + x);
                        // console.log('1:' + childSnapshot.val()[j])
                        tempStr += `<div class="pixel" style="background-color:  ${childSnapshot.val()[x]};"></div>`
                        x++
                    }
                    tempStr += `</div>`
                }
                tempStr += ` </div>`
            })
        });
        setTimeout(function () {
            _gallery.innerHTML = tempStr;
            updatePixel();
        }, 700);
    })



    // clears all the coloured pixels
    document.querySelector('.clear').addEventListener('click', function () {
        _selected = true;
        _arr = [];
        if (document.querySelector(".container").childNodes) {
            for (let i = 0; i < _pixel.length; i++) {
                _arr.push(_pixel[i].style.backgroundColor = "rgb(0, 0, 0)");
            }
        } else {
            console.log('No pixels were found!');
        }
        saveCharacter(_selected, _arr);
        createCharacterMatrix();
    })



    function loopThroughCharacters(_selected, _arr) {
        
        if (_arr.length) {
            _interval = setInterval(function () {
                this.mm = 4500;
                for (var i = 0; i < _arr.length; i++) {
                    // for each iteration console.log a word
                    // and make a pause after it
                    (function (i) {
                        setTimeout(function () {
                            saveCharacter(_selected, _arr[i]);

                            // show the selected character - dirty tbd in function
                            tempStr2 = '';
                            let x = 0;
                            for (var j = 0; j < 8; j++) {
                                tempStr2 += `<div class="pixels" style="background-color: rgb(255, 255, 255);">`
                                for (var k = 0; k < 8; k++) {
                                    tempStr2 += `<div class="pixelSelected" style="background-color:  ${_arr[i][x]};"></div>`
                                    x++
                                }
                                tempStr2 += `</div>`
                            }
                            _pixelsContainer.innerHTML = tempStr2;

                        }, 1000 * i);
                    })(i);

                }
               
            }, 4500);

        } else {
            // issue ><
            //  console.log(_interval)
            // clearInterval(_interval);

            location.reload();
        }

    }

    // Loop button listener                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    document.querySelector('.loop').addEventListener('click', function () {
        _selected = true;
        _arr = [];
        _status = true;

        if (document.querySelector('.loop')) {
            document.querySelector('.loop').className = "loopOn"
            document.querySelector('.loopOn').innerHTML = "Loop on"
            document.querySelector('.loopOn').style.backgroundColor = "red";


            _database.ref().child('characters').on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    this._arr.push(childSnapshot.val());
                })
            })

            setTimeout(function () {
                loopThroughCharacters(_selected, _arr);
            }, 2000);
        } else if (!document.querySelector('.loop')) {
            el = document.querySelector('.loopOn').className = "loop";
            document.querySelector('.loop').innerHTML = "Loop off"
            document.querySelector('.loop').style.backgroundColor = "#020455de";

            _arr = [];
            loopThroughCharacters(_selected, _arr)
        }

    })




    return {
        init: init
    };



}

// init the application 
window.onload = function () {
    const app = new App();
    app.init();
}


