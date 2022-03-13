// variables, constants, arrays and objects
var myEl02, myElTxt02, page02, src02;
var editor02 = document.getElementById('csws_html_hilighter02');
addEventListener('onclick',start02);
caret02 = {
    cl02: 'csws_html_caret02'
}

function updateVariables02() {
    src02.addEventListener('input', start02);
    src02.addEventListener('scroll', resizeEditor02);

    srcVal02 = src02.value;
    srcLen02 = src02.value.length;
    line02 = {
        val02: 'line02.val02',
        no02: 0,
        cl02: 'line02'
    };
    text02 = {
        fIndex02: 0,
        lIndex02: 0,
        permission02: true,
        val02: '',
        cl02: 'text02'
    };
    sign02 = {
        permission02: false,
        len02: 0,
        cl02: 'sign02',
        val02: ' ',
        list02: '`~!@#$%^&*()-_=+[{]}|;:,<.>/?'
    }
    html02 = {
        permission02: false,
        fIndex02: 0,
        lIndex02: 0,
        bracket02: {
            cl02: 'html-asign02'
        },
        tag02: {
            permission02: false,
            list02: ' a div html p pre script style ',
            cl02: 'html-tag02'
        },
        sign02: {
            permission02: false,
            cl02: 'html-sign02'
        },
        attr02: {
            permission02: false,
            cl02: 'html-attr02'
        },
        attrVal02: {
            permission02: false,
            cl02: 'html-attrVal02',
            valE02: '0'
        },
        bracket02: {
            cl02: 'html-bracket02'
        },
        comment02: {
            cl02: 'html-comment02'
        }
    };
    css02 = {
        permission02: false,
        fIndex02: 0,
        lIndex02: 0
    };
    js02 = {
        permission02: false,
        fIndex02: 0,
        lIndex02: 0
    };
    err02 = {
        cl02: 'err02',
        permission02: false,
        val02: ''
    };


}
// update variables

window.onload = setEnv02();
function setEnv02() {
//     updateVariables();
    myEl02 = document.createElement('pre');
    myEl02.setAttribute('id', 'csws_html_page02');
    editor02.appendChild(myEl02);
    page02 = document.getElementById('csws_html_page02');
    myEl02 = document.createElement('textarea');
    myEl02.setAttribute('id', 'csws_html_src02')
    myEl02.setAttribute('wrap', 'off');
    myEl02.setAttribute('spellcheck', 'false');
    editor02.appendChild(myEl02);
    src02 = document.getElementById('csws_html_src02');
    resizeEditor02();

    start02();
    animateCaret02();

}

function start02() {
//       console.clear();
   updateVariables02();
   page02.innerHTML = '';
   newLine02();
   for (i = 0; i <= srcLen02; i++) {
       getPermission02();
       if (html02.permission02) {
           htmlOffice02();
       }
       if (text02.permission02) {
           textOffice02();
       }
   }
   resizeEditor02();
   
   highlight02(caret02.cl02, '');
//     console.log(srcVal.charCodeAt(srcLen - 1));
}
// start



function getPermission02() {
    if (!(css02.permission02) && !(js02.permission02) && !(html02.permission02)) {
        if (srcVal02.charCodeAt(i) != 32) {
            if (srcVal02.charCodeAt(i - 1) == 60) {
                text02.lIndex02 = i - 1;
                if (text02.permission02) {
                    newText02();
                }
                highlight02(html02.bracket02.cl02, srcVal02.charAt(i - 1));
                html02.tag02.fIndex02 = i;
                html02.fIndex02 = i;
                html02.permission02 = true;
                html02.tag02.permission02 = true;
                text02.fIndex02 = i;
                text02.permission02 = false;
            }
        }
    }
}

function textOffice02() {
    if (i == src02.selectionStart02) {
        text02.lIndex02 = i;
        newText02();
        console.log(caret02.cl02);
        highlight02(caret02.cl02, '');
        text02.fIndex02 = i;
    }
    if (i == srcLen02) {
        text02.lIndex02 = i
    }
    newText02();
    if (srcVal02.charCodeAt(i) == 10) {
        text02.lIndex02= i;
        newText02();
        text02.fIndex02 = i + 1;
        newLine02();
    }
}

function resizeEditor02() {
    src02.style.height = getComputedStyle(editor02).height;
    src02.style.width = getComputedStyle(editor02).width;
    page02.style.height = getComputedStyle(editor02).height;
    page02.style.width = getComputedStyle(editor02).width;
    page02.scrollTo(src02.scrollLeft, src02.scrollTop);
    src02.style.transform = 'translate(0,' + -parseInt(getComputedStyle(page02).height) + 'px)';
}

function htmlOffice02() {
    if(srcVal02.charCodeAt(i) == 10) {
        if (html02.tag02.permission02) {
            html02.tag02.lIndex02 = i;
            html02.tag02.val02 = srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02);
            highlight02(html02.tag02.cl02, html02.tag02.val02);
            html02.tag02.permission02 = false;
            html02.attr02.permission02 = true;
            html02.attr02.fIndex02 = i+1;
            newLine02();
        } else if(html02.attr02.permission02) {
            html02.attr02.lIndex02 = i ;
            highlight02(html02.attr02.cl02, srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02));
            html02.attr02.fIndex02 = i+1;
            newLine02();
        } else if(html02.attrVal02.permission02) {
            html02.attrVal02.lIndex02 = i;
            highlight02(html02.attrVal02.cl02, srcVal02.slice(html02.attrVal02.fIndex02, html02.attrVal02.lIndex02));
            html02.attrVal02.fIndex02 = i+1;
            newLine02();
        } else if(html02.comment02.permission02) {
            html02.comment02.lIndex02 = i;
            highlight02(html02.comment02.cl02, srcVal02.slice(html02.comment02.fIndex02, html02.comment02.lIndex02));
            html02.comment02.fIndex = i+1;
            newLine02();
        }

    }
    // comment
    if(srcVal02.charCodeAt(i) == 45 && srcVal02.charCodeAt(i-1) == 45 && srcVal02.charCodeAt(i-2) == 33  && srcVal02.charCodeAt(i-3) == 60) {
        if(html02.tag02.permission02) {
            html02.tag02.lIndex02 = i-4;
            highlight02(html02.tag02.cl02, srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02));
            html02.tag02.permission02 = false;
        } else if (html02.attr02.permission02) {
            html02.attr02.lIndex02 = i-4;
            highlight02(html02.attr02.cl02, srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02));
            html02.attr02.permission02 = false;
        }
        html02.comment02.permission02 = true;
        html02.comment02.fIndex02 = i-2;
    }
    if(html02.comment02.permission02) {
        if (i == src02.selectionStart) {
            html02.comment02.lIndex02 = i;
            html02.comment02.val02 = srcVal02.slice(html02.comment02.fIndex02, html02.comment02.lIndex02);
            highlight02(html02.comment02.cl02, html02.comment02.val02);
            highlight02(caret02.cl02, '');
            html02.comment02.fIndex02 = i;
        }
        if (i == srcLen02) {
            html02.comment02.lIndex02 = i;
            html02.comment02.val02 = srcVal02.slice(html02.comment02.fIndex02, html02.comment02.lIndex02);
            highlight02(html02.comment02.cl02, html02.comment02.val02);
        }
        if(srcVal02.charCodeAt(i) == 62 && srcVal02.charCodeAt(i-1) == 45 && srcVal02.charCodeAt(i-2) == 45) {
            html02.comment02.lIndex02 = i;
            highlight02(html02.comment02.cl02, srcVal02.slice02(html02.comment02.fIndex02, html02.comment02.lIndex02));
            html02.comment02.permission02 = false;
            text02.permission02 = true;
            text02.fIndex02 = i;
        }
    }
    // tag
    if (html02.tag02.permission02) {
        if (i == src02.selectionStart02) {
            html02.tag02.lIndex02 = i;
            html02.tag02.val02 = srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02);
            highlight02(html02.tag02.cl02, html02.tag02.val02);
            highlight02(caret02.cl02, '');
            html02.tag02.fIndex02 = i;
        }
        if (srcVal02.charCodeAt(i) == 32) {
            html02.tag02.lIndex02 = i;
            html02.tag02.val02 = srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02);
            highlight02(html02.tag02.cl02, html02.tag02.val02);
            html02.tag02.permission02 = false;
            html02.attr02.permission02 = true;
            html02.attr02.fIndex02 = i;
        }
        if (i == srcLen02) {
            html02.tag02.lIndex02 = i;
            html02.tag02.val02 = srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02);
            highlight02(html02.tag02.cl02, html02.tag02.val02);
        }
    }
    // attr
    if (html02.attr02.permission02) {
        if (i == src02.selectionStart && i != html02.tag02.lIndex02) {
            html02.attr02.lIndex02 = i;
            html02.attr02.val02 = srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02);
            highlight02(html02.attr02.cl02, html02.attr02.val02);
            highlight02(caret02.cl02, '');
            html02.attr02.fIndex02 = i;
        }
        if (srcVal02.charCodeAt(i) == 61) {
            html02.attr02.lIndex02 = i;
            html02.attr02.val02 = srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02);
            highlight02(html02.attr02.cl02, html02.attr02.val02);
            highlight02(html02.sign02.cl02, srcVal02.charAt(i));
            html02.attr02.permission02 = false;
            err02.permission02 = true;
            err02.fIndex02 = i + 1;
        }
        if (i == srcLen02) {
            html02.attr02.lIndex02 = i;
            html02.attr02.val02 = srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02);
            highlight02(html02.attr02.cl02, html02.attr02.val02);
        }
    }
    if (err02.permission02) {
        if(i == src02.selectionStart02 && i != html02.attr02.lIndex02) {
            err02.lIndex02 = i;
            highlight02(err02.cl02, srcVal02.slice(err02.fIndex02, err02.lIndex02));
            highlight02(caret02.cl02, '');
            err02.fIndex02 = i;
        }
        if (i == srcLen02) {
            err02.lIndex02 = i;
            err02.val02 = srcVal02.slice(err02.fIndex02, err02.lIndex02);
            highlight02(err02.cl02, err02.val02);
        }
    }
    if(html02.attrVal02.valE02 == 0) {
        if(srcVal02.charCodeAt(i) == 34 || srcVal02.charCodeAt(i) == 39) {
            if(err02.permission02) {
                err02.lIndex02 = i;
                highlight02(err02.cl02, srcVal02.slice(err02.fIndex02, err02.lIndex02));
                err02.permission02 = false;
            }
            if(html02.tag02.permission02) {
                html02.tag02.lIndex02 = i;
                highlight02(html02.tag02.cl02, srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02));
                html02.tag02.permission02 = false;
            }
            if(html02.attr02.permission02) {
                html02.attr02.lIndex02 = i;
                highlight02(html02.attr02.cl02, srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02));
                html02.attr02.permission02 = false;
            }
            html02.attrVal02.permission02 = true;
            html02.attrVal02.fIndex02 = i;
            html02.attrVal02.valE02 = srcVal02.charCodeAt(i);
        }
    }


  // attrVal
  if(html02.attrVal02.permission02) {
    if(i == src02.selectionStart02 && i != html02.attrVal02.lIndex02) {
        if(srcVal02.charCodeAt(i) == html02.attrVal02.valE02 && html02.attrVal02.fIndex02 < i) {
            html02.attrVal02.lIndex02 = i;
            highlight02(html02.attrVal02.cl02, srcVal02.slice(html02.attrVal02.fIndex02, html02.attrVal02.lIndex02));
            highlight02(caret02.cl02, '');
            highlight02(html02.attrVal02.cl02, srcVal02.charAt(i));
            html02.attrVal02.permission02 = false;
            html02.attr02.permission02 = true;
            html02.attr02.fIndex02 = i+1;
            html02.attrVal02.valE02 = 0;
        } else {
            html02.attrVal02.lIndex02 = i;
            highlight02(html02.attrVal02.cl02, srcVal02.slice(html02.attrVal02.fIndex02, html02.attrVal02.lIndex02));
            highlight02(caret02.cl02, '');
            html02.attrVal02.fIndex02 = i;
        }
    }
    if(html02.attrVal02.fIndex02 < i ) {
      if(i == srcLen02) {
        html02.attrVal02.lIndex02 = i+1;
        html02.attrVal02.val02 = srcVal02.slice(html02.attrVal02.fIndex02, html02.attrVal02.lIndex02);
        highlight02(html02.attrVal02.cl02, html02.attrVal02.val02);
      }
      if(html02.attrVal02.valE02 != 0) {
        if(srcVal02.charCodeAt(i) == html02.attrVal02.valE02) {
          html02.attrVal02.valE02 = 0;
          html02.attrVal02.permission02 = false;
          html02.attrVal02.lIndex02 = i+1;
          html02.attrVal02.val02 = srcVal02.slice(html02.attrVal02.fIndex02, html02.attrVal02.lIndex02);
          highlight02(html02.attrVal02.cl02, html02.attrVal02.val02);
          html02.attr02.permission02 = true;
          html02.attr02.fIndex02 = i+1;
        }
      }
    }
  }

    // when char at => >
    if(srcVal02.charCodeAt(i) == 62 && !(html02.comment02.permission02)){
        if(html02.tag02.permission02) {
            html02.tag02.lIndex02 = i;
            highlight02(html02.tag02.cl02, srcVal02.slice(html02.tag02.fIndex02, html02.tag02.lIndex02));
        }
        if(html02.attr02.permission02) {
            html02.attr02.lIndex02 = i;
            highlight02(html02.attr02.cl02, srcVal02.slice(html02.attr02.fIndex02, html02.attr02.lIndex02));
        }
        highlight02(html02.bracket02.cl02, srcVal02.charAt(i));
        html02.tag02.permission02 = false;
        html02.attr02.permission02 = false;
        html02.permission02 = false;
        html02.lIndex02 = i+1;
        text02.permission02 = true;
        text02.fIndex02 = i+1;
    };

}
// html office

function newLine02() {
    lineEl02 = document.createElement('div');
    lineEl02.setAttribute('class', line02.cl02);
    page02.appendChild(lineEl02);
    line02.no02 += 1;
}
function newSign02() {
    newText02();
    text02.fIndex02 = i;
    highlight02(sign02.cl02, sign02.val02);
    sign02.permission02 = false;
    line02.no02 += 1;
}
function newText02() {
    if (text02.fIndex02 < text02.lIndex02) {
        text02.val02 = srcVal02.slice(text02.fIndex02, text02.lIndex02);
        highlight02(text02.cl02, text02.val02);
    }
}
function highlight02(cl02, txt02) {
    //console.log('highlight is working test passed out');
    myEl02 = document.createElement('span');
    myElText02 = document.createTextNode(txt02);
    myEl02.setAttribute('class', cl02);
    myEl02.appendChild(myElText02);
    document.getElementsByClassName(line02.cl02)[line02.no02-1].appendChild(myEl02);
}

function animateCaret02() {
    console.log(caret02.cl02)
    if (getComputedStyle(document.querySelector('.'+caret02.cl02)).visibility == 'hidden') {
        document.querySelector('.'+caret02.cl02).style.visibility = 'visible';
    } else {
        document.querySelector('.'+caret02.cl02).style.visibility = 'hidden';
    }
    setTimeout(animateCaret02, 500);
}