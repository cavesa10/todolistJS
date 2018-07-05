(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ENTER_KEY = 13;
var c = console.log;
var d = document;
var j = JSON;
var ls = localStorage;

exports.ENTER_KEY = ENTER_KEY;
exports.c = c;
exports.d = d;
exports.j = j;
exports.ls = ls;

},{}],2:[function(require,module,exports){
'use strict';

var _helpers = require('./helpers');

var _todolist = require('./todolist');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = _helpers.d.querySelector('#task');
var list = _helpers.d.querySelector('#list');
var todo = new _todolist2.default('MyList');

todo.render();

},{"./helpers":1,"./todolist":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name) {
  _classCallCheck(this, Task);

  this.id = new Date().getTime();
  this.name = name;
  this.isComplete = false;
  return this;
};

exports.default = Task;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = function () {
  function ToDoList(key) {
    _classCallCheck(this, ToDoList);

    this.key = key;
    if (!_helpers.ls.getItem(key)) {
      _helpers.ls.setItem(key, _helpers.j.stringify([]));
    }
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  _createClass(ToDoList, [{
    key: 'addTask',
    value: function addTask(e) {
      if (!e.target.value && e.keyCode === _helpers.ENTER_KEY) {
        alert('No puedes agregar una tarea vacia');
      } else {
        if (e.keyCode === _helpers.ENTER_KEY) {
          var newTask = new _task2.default(e.target.value);
          var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));
          tasks.push(newTask);
          _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
          this.renderTask(newTask);
          e.target.value = null;
        }
        // c(this.key, tasks, newTask, ls)
      }
    }
  }, {
    key: 'editTask',
    value: function editTask(e) {
      var _this = this;

      if (e.target.localName === 'label') {
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));
        var toEdit = tasks.findIndex(function (task) {
          return task.name === e.target.textContent;
        });
        var label = _helpers.d.querySelector('[data-id="' + tasks[toEdit].id + '"]');
        // c(tasks, toEdit, label)
        var saveTask = function saveTask(e) {
          e.target.textContent = e.target.textContent;
          tasks[toEdit].name = e.target.textContent;
          _helpers.ls.setItem(_this.key, _helpers.j.stringify(tasks));
          e.target.blur();
        };
        label.addEventListener('blur', function (e) {
          return saveTask(e);
        });
        label.addEventListener('keyup', function (e) {
          return e.keyCode === _helpers.ENTER_KEY && saveTask(e);
        });
      }
    }
  }, {
    key: 'removeTask',
    value: function removeTask(e) {
      if (e.target.localName === 'a') {
        var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));
        var toRemove = tasks.findIndex(function (task) {
          return task.id.toString() === e.target.dataset.id;
        });
        // c(tasks, toRemove)
        tasks.splice(toRemove, 1);
        _helpers.ls.setItem(this.key, _helpers.j.stringify(tasks));
        e.target.parentElement.remove();
      }
    }
  }, {
    key: 'renderTask',
    value: function renderTask(task) {
      var templateTask = '\n      <li class="List-item ' + (task.isComplete ? 'complete' : '') + '">\n        <input id="' + task.id + '" type="checkbox" class="List-checkbox" ' + (task.isComplete ? 'checked' : '') + '>\n        <label data-id="' + task.id + '" class="List-label" contenteditable  spellcheck>' + task.name + '</label>\n        <a href="#" data-id="' + task.id + '" class="List-removeLink">&#128465;</a>\n      </li>\n    ';
      list.insertAdjacentHTML('beforeend', templateTask);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tasks = _helpers.j.parse(_helpers.ls.getItem(this.key));
      var listTasks = list.children;
      tasks.forEach(function (task) {
        _this2.renderTask(task);
      });
      Array.from(listTasks).forEach(function (li) {
        li.querySelector('input[type="checkbox"]').addEventListener('change', function (e) {
          var task = tasks.filter(function (task) {
            return task.id.toString() === e.target.id;
          });
          (0, _helpers.c)(task);
          if (e.target.checked) {
            e.target.parentElement.classList.add('complete');
            task[0].isComplete = true;
          } else {
            e.target.parentElement.classList.remove('complete');
            task[0].isComplete = false;
          }
          _helpers.ls.setItem(_this2.key, _helpers.j.stringify(tasks));
        });
      });
      task.addEventListener('keyup', this.addTask);
      list.addEventListener('click', this.editTask);
      list.addEventListener('click', this.removeTask);
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./helpers":1,"./task":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaGVscGVycy5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy90YXNrLmpzIiwic3JjL2pzL3RvZG9saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFNLFlBQVksRUFBbEI7QUFDQSxJQUFNLElBQUksUUFBUSxHQUFsQjtBQUNBLElBQU0sSUFBSSxRQUFWO0FBQ0EsSUFBTSxJQUFJLElBQVY7QUFDQSxJQUFNLEtBQUssWUFBWDs7UUFHRSxTLEdBQUEsUztRQUNBLEMsR0FBQSxDO1FBQ0EsQyxHQUFBLEM7UUFDQSxDLEdBQUEsQztRQUNBLEUsR0FBQSxFOzs7OztBQ1hGOztBQUNBOzs7Ozs7QUFFQSxJQUFNLE9BQU8sV0FBRSxhQUFGLENBQWdCLE9BQWhCLENBQWI7QUFDQSxJQUFNLE9BQU8sV0FBRSxhQUFGLENBQWdCLE9BQWhCLENBQWI7QUFDQSxJQUFNLE9BQU8sSUFBSSxrQkFBSixDQUFhLFFBQWIsQ0FBYjs7QUFFQSxLQUFLLE1BQUw7Ozs7Ozs7Ozs7O0lDUHFCLEksR0FDbkIsY0FBYSxJQUFiLEVBQW1CO0FBQUE7O0FBQ2pCLE9BQUssRUFBTCxHQUFVLElBQUksSUFBSixHQUFXLE9BQVgsRUFBVjtBQUNBLE9BQUssSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxTQUFPLElBQVA7QUFDRCxDOztrQkFOa0IsSTs7Ozs7Ozs7Ozs7QUNBckI7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFE7QUFDbkIsb0JBQWEsR0FBYixFQUFrQjtBQUFBOztBQUNoQixTQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsUUFBSSxDQUFDLFlBQUcsT0FBSCxDQUFXLEdBQVgsQ0FBTCxFQUFzQjtBQUNwQixrQkFBRyxPQUFILENBQVcsR0FBWCxFQUFnQixXQUFFLFNBQUYsQ0FBWSxFQUFaLENBQWhCO0FBQ0Q7QUFDRCxTQUFL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QWJEO0FBY0EsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLE9BQXBDO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLFFBQXBDO0FBQ0EsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLLFVBQXBDO0FBQ0Q7Ozs7OztrQkF4RmtCLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBFTlRFUl9LRVkgPSAxM1xuY29uc3QgYyA9IGNvbnNvbGUubG9nXG5jb25zdCBkID0gZG9jdW1lbnRcbmNvbnN0IGogPSBKU09OXG5jb25zdCBscyA9IGxvY2FsU3RvcmFnZVxuXG5leHBvcnQge1xuICBFTlRFUl9LRVksXG4gIGMsXG4gIGQsXG4gIGosXG4gIGxzXG59XG4iLCJpbXBvcnQgeyBkIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IFRvRG9MaXN0IGZyb20gJy4vdG9kb2xpc3QnXG5cbmNvbnN0IHRhc2sgPSBkLnF1ZXJ5U2VsZWN0b3IoJyN0YXNrJylcbmNvbnN0IGxpc3QgPSBkLnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JylcbmNvbnN0IHRvZG8gPSBuZXcgVG9Eb0xpc3QoJ015TGlzdCcpXG5cbnRvZG8ucmVuZGVyKClcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lKSB7XHJcbiAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge2QsIGMsIGxzLCBqLCBFTlRFUl9LRVl9IGZyb20gJy4vaGVscGVycydcclxuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gIGNvbnN0cnVjdG9yIChrZXkpIHtcclxuICAgIHRoaXMua2V5ID0ga2V5XHJcbiAgICBpZiAoIWxzLmdldEl0ZW0oa2V5KSkge1xyXG4gICAgICBscy5zZXRJdGVtKGtleSwgai5zdHJpbmdpZnkoW10pKVxyXG4gICAgfVxyXG4gICAgdGhpcy5hZGRUYXNrID0gdGhpcy5hZGRUYXNrLmJpbmQodGhpcylcclxuICAgIHRoaXMuZWRpdFRhc2sgPSB0aGlzLmVkaXRUYXNrLmJpbmQodGhpcylcclxuICAgIHRoaXMucmVtb3ZlVGFzayA9IHRoaXMucmVtb3ZlVGFzay5iaW5kKHRoaXMpXHJcbiAgfVxyXG4gIGFkZFRhc2sgKGUpIHtcclxuICAgIGlmICghZS50YXJnZXQudmFsdWUgJiYgZS5rZXlDb2RlID09PSBFTlRFUl9LRVkpIHtcclxuICAgICAgYWxlcnQoJ05vIHB1ZWRlcyBhZ3JlZ2FyIHVuYSB0YXJlYSB2YWNpYScpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSBFTlRFUl9LRVkpIHtcclxuICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKGUudGFyZ2V0LnZhbHVlKVxyXG4gICAgICAgIGxldCB0YXNrcyA9IGoucGFyc2UobHMuZ2V0SXRlbSh0aGlzLmtleSkpXHJcbiAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKVxyXG4gICAgICAgIGxzLnNldEl0ZW0odGhpcy5rZXksIGouc3RyaW5naWZ5KHRhc2tzKSlcclxuICAgICAgICB0aGlzLnJlbmRlclRhc2sobmV3VGFzaylcclxuICAgICAgICBlLnRhcmdldC52YWx1ZSA9IG51bGxcclxuICAgICAgfVxyXG4gICAgICAvLyBjKHRoaXMua2V5LCB0YXNrcywgbmV3VGFzaywgbHMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlZGl0VGFzayAoZSkge1xyXG4gICAgaWYgKGUudGFyZ2V0LmxvY2FsTmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICBsZXQgdGFza3MgPSBqLnBhcnNlKGxzLmdldEl0ZW0odGhpcy5rZXkpKVxyXG4gICAgICBsZXQgdG9FZGl0ID0gdGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5uYW1lID09PSBlLnRhcmdldC50ZXh0Q29udGVudClcclxuICAgICAgbGV0IGxhYmVsID0gZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7dGFza3NbdG9FZGl0XS5pZH1cIl1gKVxyXG4gICAgICAvLyBjKHRhc2tzLCB0b0VkaXQsIGxhYmVsKVxyXG4gICAgICBjb25zdCBzYXZlVGFzayA9IGUgPT4ge1xyXG4gICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnRcclxuICAgICAgICB0YXNrc1t0b0VkaXRdLm5hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudFxyXG4gICAgICAgIGxzLnNldEl0ZW0odGhpcy5rZXksIGouc3RyaW5naWZ5KHRhc2tzKSlcclxuICAgICAgICBlLnRhcmdldC5ibHVyKClcclxuICAgICAgfVxyXG4gICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZSA9PiBzYXZlVGFzayhlKSlcclxuICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IChlLmtleUNvZGUgPT09IEVOVEVSX0tFWSkgJiYgc2F2ZVRhc2soZSkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVUYXNrIChlKSB7XHJcbiAgICBpZiAoZS50YXJnZXQubG9jYWxOYW1lID09PSAnYScpIHtcclxuICAgICAgbGV0IHRhc2tzID0gai5wYXJzZShscy5nZXRJdGVtKHRoaXMua2V5KSlcclxuICAgICAgbGV0IHRvUmVtb3ZlID0gdGFza3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5pZC50b1N0cmluZygpID09PSBlLnRhcmdldC5kYXRhc2V0LmlkKVxyXG4gICAgICAvLyBjKHRhc2tzLCB0b1JlbW92ZSlcclxuICAgICAgdGFza3Muc3BsaWNlKHRvUmVtb3ZlLCAxKVxyXG4gICAgICBscy5zZXRJdGVtKHRoaXMua2V5LCBqLnN0cmluZ2lmeSh0YXNrcykpXHJcbiAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlclRhc2sgKHRhc2spIHtcclxuICAgIGxldCB0ZW1wbGF0ZVRhc2sgPSBgXHJcbiAgICAgIDxsaSBjbGFzcz1cIkxpc3QtaXRlbSAke3Rhc2suaXNDb21wbGV0ZSA/ICdjb21wbGV0ZScgOiAnJ31cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCIke3Rhc2suaWR9XCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJMaXN0LWNoZWNrYm94XCIgJHt0YXNrLmlzQ29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJ30+XHJcbiAgICAgICAgPGxhYmVsIGRhdGEtaWQ9XCIke3Rhc2suaWR9XCIgY2xhc3M9XCJMaXN0LWxhYmVsXCIgY29udGVudGVkaXRhYmxlICBzcGVsbGNoZWNrPiR7dGFzay5uYW1lfTwvbGFiZWw+XHJcbiAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJHt0YXNrLmlkfVwiIGNsYXNzPVwiTGlzdC1yZW1vdmVMaW5rXCI+JiMxMjg0NjU7PC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgYFxyXG4gICAgbGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRlbXBsYXRlVGFzaylcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBsZXQgdGFza3MgPSBqLnBhcnNlKGxzLmdldEl0ZW0odGhpcy5rZXkpKVxyXG4gICAgbGV0IGxpc3RUYXNrcyA9IGxpc3QuY2hpbGRyZW5cclxuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgIHRoaXMucmVuZGVyVGFzayh0YXNrKVxyXG4gICAgfSlcclxuICAgIEFycmF5LmZyb20obGlzdFRhc2tzKS5mb3JFYWNoKGxpID0+IHtcclxuICAgICAgbGkucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XHJcbiAgICAgICAgbGV0IHRhc2sgPSB0YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmlkLnRvU3RyaW5nKCkgPT09IGUudGFyZ2V0LmlkKVxyXG4gICAgICAgIGModGFzaylcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpXHJcbiAgICAgICAgICB0YXNrWzBdLmlzQ29tcGxldGUgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGUnKVxyXG4gICAgICAgICAgdGFza1swXS5pc0NvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgbHMuc2V0SXRlbSh0aGlzLmtleSwgai5zdHJpbmdpZnkodGFza3MpKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmFkZFRhc2spXHJcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5lZGl0VGFzaylcclxuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZVRhc2spXHJcbiAgfVxyXG59XHJcbiJdfQ==
