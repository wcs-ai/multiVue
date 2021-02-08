"use strict";

function assert(condition, tip = "Value error", value) {
    // 数据类型控制使用,
    if (!condition) {
        if (value) {
            console.error("ABOUT DATA>>>", value);
        }
        throw tip;
    }
}

function strSelect(str, start, num) {
    // 字符截取。
    if (!str) return str;
    const _start = start || 0;
    const _end = num || str.length;
    let _nstr = str;
    return _nstr.substr(_start, _end);
}

function dictSort(arr, key) {
    //对[{},{}]型数据进行排序。
    assert(varType(arr) === "array", "must be array");

    arr.sort(function(a, b) {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        } else {
            return 0;
        }
    });
}

function updateDict(dict1, dict2) {
    // dict2中的值更新到字典dict1。
    assert(varType(dict1) === "dict", "must be dict");
    assert(varType(dict2) === "dict", "must be dict");

    for (let i in dict2) {
        dict1[i] = dict2[i];
    }
}

function varType(val) {
    // 具体数据类型
    let _t = typeof val;
    if (_t === "object") {
        if (_t === null) {
            return "null";
        } else if (val instanceof Array) {
            return "array";
        } else {
            return "dict";
        }
    } else {
        return _t;
    }
}

function multiConcat(arr) {
    // 二维列表-》一维
    let empty = [];
    arr.forEach(val => {
        if (arr instanceof Array) {
            empty = empty.concat(val);
        } else {
            empty.push(val);
        }
    });
    return empty;
}
/*
function copy(obj){
    // 浅拷贝对象
    const _typ = varType(obj);
    if(_typ==='array'){
        let _array = [];
        for(){}
    }
}
*/
function createArr(len, val) {
    // 构建指定长数组
    let arr = [];
    for (var i = 0; i < len; i++) {
        if (val instanceof Object) {
            arr.push({});
        } else if (val instanceof Array) {
            arr.push([]);
        } else {
            arr.push(val);
        }
    }
    return arr;
}

function padeArr(array, val, len) {
    // 填充数组到指定长
    let _arr = [...array];
    const _val = val || "";
    const _len = len || 0;

    for (let i = 0; i < _len; i++) {
        _arr.push(_val);
    }
    return _arr;
}
/**分糖果
 * 每个孩子至少分配到 1 个糖果。
 * 相邻的孩子中，评分高的孩子必须获得更多的糖果。
 */
function distribute(arr) {
    console.assert(arr instanceof Array);
    let _num = createArr(arr.length, 1);
    // 左至右循环改变
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > arr[i - 1]) {
            _num[i] = _num[i - 1] + 1;
        }
    }
    // 右至左循环改变。
    for (var j = arr.length - 2; j >= 0; j--) {
        if (arr[j] > arr[j + 1] && _num[j] === 1) {
            _num[j] = _num[j + 1] + 1;
        }
    }
    //console.log('res', _num);
    return _num;
}

// 数据结构部分

function Node(data, name, parent, weight) {
    /** 节点，存储数据。
     * name，parent，weight需要。
     * */
    // 名，父节点名。
    this.name = name || "";
    this.parent = parent || "";
    // 左右节点。
    this.left = "";
    this.right = "";
    // 权重，
    this.weight = weight || 0;
    this.data = data || null;
}

function LinList(prop) {
    /**三叉链表
     * node：存储节点的类。
     * prop：建立链接过程中使用的属性
     * */
    this._headPoint = 0;
    this._endPoint = 0;
    this._prop = prop || "parent,name";
}
LinList.prototype = {
    _nameList: [], //存储名的与nodeList的对应表。
    _nodeList: [], //[{id:地址,pPoint:指向上一个,node:节点数据,lPoint:1,rPoint:2,level:0},{}]
    _level: 0, //  层级
    append: function(node) {
        // 自顶向下的添加节点。
        let [p, n] = this._prop.split(",");

        const _searchIdx = nm => {
            return this._nameList.indexOf(node[nm]);
        };
        // 添加该节点
        this._nodeList.push({
            id: this._endPoint, // 一个唯一标识
            pPoint: NaN, // 指向父节点
            node: node, // 节点数据
            lPoint: "",
            rPoint: "",
            level: 0 //该点所属层级。
        });

        if (this._nameList.includes(node[p])) {
            const _pIdx = _searchIdx(p);
            //**********存在其父节点 */
            this._nodeList[this._endPoint]["pPoint"] = _pIdx;
            // 计算层级。
            this._nodeList[this._endPoint]["level"] =
                this._nodeList[_pIdx]["level"] + 1;
            // 更新其父节点的子节点。
            if (this._nodeList[_pIdx]["lPoint"]) {
                this._nodeList[_pIdx]["rPoint"] = this._endPoint + 1;
            } else {
                this._nodeList[_pIdx]["lPoint"] = this._endPoint + 1;
            }
        }

        if (this._nameList.includes(node["left"])) {
            //  左节点存在。
            const _lefP = _searchIdx("left");
            this._nodeList[this._endPoint]["lPoint"] = _lefP;

            // 更新其子节点的父指针。
            this._nodeList[_lefP]["pPoint"] = this._endPoint;
        }

        if (this._nameList.includes(node["right"])) {
            //  右节点存在。
            const _rifP = _searchIdx("right");
            this._nodeList[this._endPoint]["rPoint"] = _rifP;

            // 更新其子节点的父指针。
            this._nodeList[_rifP]["pPoint"] = this._endPoint;
        }

        // 更新尾节点
        this._endPoint += 1;
        // 当前节点名添加到列表。
        this._nameList.push(node[n]);
    },
    updateHeadPoint() {
        // 只允许存在一个根节点。
        this._nodeList.map((item, idx) => {
            if (isNaN(item.pPoint)) {
                this._headPoint = idx;
            }
        });
    },
    calcLevel(parPoint) {
        // 计算每个节点所处层级。
        assert(typeof parPoint === "number", "query start point");
        const _pNode = this._nodeList[parPoint];
        const _nextLevel = _pNode.level + 1;

        // 更新层级、递归。
        if (typeof _pNode.lPoint === "number") {
            this._nodeList[_pNode.lPoint].level = _nextLevel;
            this._level = _nextLevel > this._level ? _nextLevel : this._level;
            this.calcLevel(_pNode.lPoint);
        }
        if (typeof _pNode.rPoint === "number") {
            this._nodeList[_pNode.rPoint].level = _nextLevel;
            this._level = _nextLevel > this._level ? _nextLevel : this._level;
            this.calcLevel(_pNode.rPoint);
        }
    },
    kLevelMax(k) {
        // 第k层最大节点数
        return Math.pow(2, k - 1);
    },
    maxNodeNum(k) {
        //为k层的树，最多的节点数
        return Math.pow(2, k) - 1;
    }
};
// 将一个列表，建立树。{node1},{name,age,m},{},{},{}

function Tree(nodes) {
    // 构建树。
    this._nodes = [...nodes];
}
Tree.prototype = {
    NAME: "_NODE_",
    nodeIndex: 0,
    _headPoint: 0,
    _nodes: [],
    store: {
        names: [], //已存到result中的节点名。
        result: []
    },
    create: function() {
        // 构建查找二叉树。
        dictSort(this._nodes, "weight");

        // 添加新的节点。
        const _nName = this.NAME + this.nodeIndex;
        this.nodeIndex += 1;

        let _nNode = new Node(null, _nName, NaN);
        // 更新节点信息。取最小的两个节点。
        _nNode.weight = this._nodes[0]["weight"] + this._nodes[1]["weight"];
        _nNode.left = this._nodes[0]["name"];
        _nNode.right = this._nodes[1]["name"];

        this._nodes[0]["parent"] = _nName;
        this._nodes[1]["parent"] = _nName;

        // 对应位置的添加与删除。

        [this._nodes[0], this._nodes[1]].map(val => {
            if (!this.store.names.includes(val.name)) {
                this.store.result.push(val);
                this.store.names.push(val.name);
            }
        });

        //console.log("resLen>>", this.store.result.length);

        this._nodes.shift();
        this._nodes.shift();
        //console.log("nodeLen>>", this._nodes.length);
        // 剩余节点表中少于一个则退出。
        if (this._nodes.length === 0) {
            this.store.result.push(_nNode);
            this.save();
        } else {
            this._nodes.unshift(_nNode);
            // 递归操作。
            this.create();
        }
    },
    save() {
        // 使用三叉链表存储。
        var _save = new LinList();
        this.store.result.forEach(nd => {
            _save.append(nd);
        });

        _save.updateHeadPoint();
        // 暴露头指针。
        this._headPoint = _save._headPoint;
        _save.calcLevel(_save._headPoint);
        //console.log("ss>", _save._nodeList);
        this._nodes = _save._nodeList;
    },
    info() {
        return { headPoint: this._headPoint, nodes: this._nodes };
    }
};

function env() {
    // 运行环境判断。
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    let _env_info = {
        isPC: false,
        isIOS: false,
        app: "other"
    };
    if (browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
        _env_info["isPC"] = false;
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) === "micromessenger") {
            //在微信中打开
            _env_info['app'] = "wx";
        }
        if (ua.match(/WeiBo/i) === "weibo") {
            //在新浪微博客户端打开
            _env_info["app"] = "wb";
        }
        if (ua.match(/QQ/i) === "qq") {
            //在QQ空间打开
            _env_info["app"] = "qq";
        }
        if (browser.versions.ios) {
            //是否在IOS浏览器打开
            _env_info["isIOS"] = true;
        }
        if (browser.versions.android) {
            //是否在安卓浏览器打开
            _env_info["isIOS"] = false;
        }
    } else {
        //否则就是PC浏览器打开
        _env_info["isPC"] = true;
    }
    return _env_info;

}


/*矩阵操作原型*/
function Matrix(data) {
    this._array = [...data];
}
Matrix.prototype = {
    __init__: function() {
        // 获取矩阵信息。
    },
    pice: function(a) {
        // a:[:,1]
    },
    col: function(i) {
        // 读取列
        let _col = [];
        this._array.forEach((val) => {
            _col.push(val[i]);
        });
        return _col;
    }
};

function ArrayOP(arr) {
    // 矩阵切片
    var _mtp = new Matrix(arr);
    return _mtp;
}


/*易位加密算法*/
function positionPass(pass) {
    const K = "JUSTICE";
    let _pass = pass;
    const K_LEN = K.length;
    const PASS_LEN = _pass.length;
    // 矩阵头
    let KS = K.split("");

    assert(KS.length === K_LEN, 'length error', KS);

    // 确定列号
    let _ks_sort = [...KS];
    _ks_sort.sort();

    let _ks_ord = {},
        _j = 0;
    for (let _c of _ks_sort) {
        _ks_ord[_c] = _j;
        _j++;
    }

    let _passArray = [];
    let _forCount = Math.floor(PASS_LEN / K_LEN);

    _forCount = PASS_LEN / K_LEN === 0 ? _forCount : _forCount + 1;

    // 明文矩阵
    for (let i = 0; i < _forCount; i++) {
        if (i === _forCount - 1) {
            const _s = _pass.substr(i * K_LEN, (i + 1) * K_LEN).split("");
            _passArray.push(padeArr(_s, "", K_LEN));
        } else {
            const _s = _pass.substr(i * K_LEN, (i + 1) * K_LEN);
            _passArray.push(_s.split(""));
        }
    };

    // 加密
    var _res = "";
    const np = ArrayOP(_passArray);
    _ks_sort.forEach((itm) => {
        const _ncol = np.col(_ks_ord[itm]);
        _res += _ncol.join("");
    });

    return _res;

}

function replacePass(pass) {
    // 置换加密。
    const OS1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const OS2 = "0123456789";

    const RS1 = "BCOMINGDPAREFKHJSLQVTUWZXY";
    const RS2 = "9016253748";

    const _pass = pass.split("");

    let _lockPass = [];
    let _v, _ord;
    _pass.forEach((val, ix) => {
        _v = val.toUpperCase();
        if (/^\d$/.test(_v)) {
            _ord = OS2.indexOf(_v);
            _lockPass.push(RS2.charAt(_ord));
        } else if (OS1.indexOf(_v) !== -1) {
            _ord = OS1.indexOf(_v);
            _lockPass.push(RS1.charAt(_ord));
        } else {
            // 非字母和数字。
            _lockPass.push('_');
        }
    });

    return _lockPass.join("");
}


export default {
    strSelect,
    varType,
    multiConcat,
    createArr,
    distribute,
    Node,
    LinList,
    Tree,
    updateDict,
    dictSort,
    positionPass,
    replacePass
};

/**
 **************************************************************
 *                                                            *
 *   .=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-.       *
 *    |                     ______                     |      *
 *    |                  .-"      "-.                  |      *
 *    |                 /            \                 |      *
 *    |     _          |              |          _     |      *
 *    |    ( \         |,  .-.  .-.  ,|         / )    |      *
 *    |     > "=._     | )(__/  \__)( |     _.=" <     |      *
 *    |    (_/"=._"=._ |/     /\     \| _.="_.="\_)    |      *
 *    |           "=._"(_     ^^     _)"_.="           |      *
 *    |               "=\__|IIIIII|__/="               |      *
 *    |              _.="| \IIIIII/ |"=._              |      *
 *    |    _     _.="_.="\          /"=._"=._     _    |      *
 *    |   ( \_.="_.="     `--------`     "=._"=._/ )   |      *
 *    |    > _.="                            "=._ <    |      *
 *    |   (_/                                    \_)   |      *
 *    |                                                |      *
 *    '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='      *
 *                                                            *
 *           LASCIATE OGNI SPERANZA, VOI CH'ENTRATE           *
 *                （译文：进来的人，放弃一切希望）               *
 **************************************************************
 */


/**
 * ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 * │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 * └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 * │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 * │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 * │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 * │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 * ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 * │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 * └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 *
 *              ,----------------,              ,---------,
 *         ,-----------------------,          ,"        ,"|
 *       ,"                      ,"|        ,"        ,"  |
 *      +-----------------------+  |      ,"        ,"    |
 *      |  .-----------------.  |  |     +---------+      |
 *      |  |                 |  |  |     | -==----'|      |
 *      |  |  I LOVE DOS!    |  |  |     |         |      |
 *      |  |  Bad command or |  |  |/----|`---=    |      |
 *      |  |  C:\>_          |  |  |   ,/|==== ooo |      ;
 *      |  |                 |  |  |  // |(((( [33]|    ,"
 *      |  `-----------------'  |," .;'| |((((     |  ,"
 *      +-----------------------+  ;;  | |         |,"
 *         /_)______________(_/  //'   | +---------+
 *    ___________________________/___  `,
 *   /  oooooooooooooooo  .o.  oooo /,   \,"-----------
 *  / ==ooooooooooooooo==.o.  ooo= //   ,`\--{)B     ,"
 * /_==__==========__==_ooo__ooo=_/'   /___________,"
 *
 *
 *                 .-~~~~~~~~~-._       _.-~~~~~~~~~-.
 *             __.'              ~.   .~              `.__
 *           .'//                  \./                  \\`.
 *         .'//                     |                     \\`.
 *       .'// .-~"""""""~~~~-._     |     _,-~~~~"""""""~-. \\`.
 *     .'//.-"                 `-.  |  .-'                 "-.\\`.
 *   .'//______.============-..   \ | /   ..-============.______\\`.
 * .'______________________________\|/______________________________`.
 *
 */