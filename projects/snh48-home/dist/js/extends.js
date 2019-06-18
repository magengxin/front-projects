'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User(name, password) {
        _classCallCheck(this, User);

        this.name = name;
        this.password = password;
    }

    _createClass(User, [{
        key: 'showname',
        value: function showname() {
            console.log(this.name);
        }
    }, {
        key: 'showpass',
        value: function showpass() {
            console.log(this.password);
        }
    }]);

    return User;
}();

var Xiaoming = function (_User) {
    _inherits(Xiaoming, _User);

    function Xiaoming(name, password, level) {
        _classCallCheck(this, Xiaoming);

        var _this = _possibleConstructorReturn(this, (Xiaoming.__proto__ || Object.getPrototypeOf(Xiaoming)).call(this, name, password));

        _this.level = level;
        return _this;
    }

    _createClass(Xiaoming, [{
        key: 'showlevel',
        value: function showlevel() {
            console.log(this.level);
        }
    }]);

    return Xiaoming;
}(User);

var xiaoming = new Xiaoming('xiao', 123456, 100);
xiaoming.showname();
xiaoming.showpass();
xiaoming.showlevel();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJleHRlbmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyKG5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVc2VyKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFVzZXIsIFt7XG4gICAgICAgIGtleTogJ3Nob3duYW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3duYW1lKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2hvd3Bhc3MnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hvd3Bhc3MoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhc3N3b3JkKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBVc2VyO1xufSgpO1xuXG52YXIgWGlhb21pbmcgPSBmdW5jdGlvbiAoX1VzZXIpIHtcbiAgICBfaW5oZXJpdHMoWGlhb21pbmcsIF9Vc2VyKTtcblxuICAgIGZ1bmN0aW9uIFhpYW9taW5nKG5hbWUsIHBhc3N3b3JkLCBsZXZlbCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgWGlhb21pbmcpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChYaWFvbWluZy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFhpYW9taW5nKSkuY2FsbCh0aGlzLCBuYW1lLCBwYXNzd29yZCkpO1xuXG4gICAgICAgIF90aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoWGlhb21pbmcsIFt7XG4gICAgICAgIGtleTogJ3Nob3dsZXZlbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93bGV2ZWwoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxldmVsKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBYaWFvbWluZztcbn0oVXNlcik7XG5cbnZhciB4aWFvbWluZyA9IG5ldyBYaWFvbWluZygneGlhbycsIDEyMzQ1NiwgMTAwKTtcbnhpYW9taW5nLnNob3duYW1lKCk7XG54aWFvbWluZy5zaG93cGFzcygpO1xueGlhb21pbmcuc2hvd2xldmVsKCk7Il0sImZpbGUiOiJleHRlbmRzLmpzIn0=
