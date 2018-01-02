/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function () {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function () {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* 遍历判断allFeeds属性
         * 当不传递regular值，判断属性值是否存在
         * 当传regular时，判断属性值是否符合正则表达式regular
         * 返回true,false
         */
        function isAviliable(key, regular) {
            if (!key || !allFeeds) { return false; }
            for (var i = 0; i < allFeeds.length; i++) {
                if (!allFeeds[i][key]) { return false; }
                if (regular && !(regular).test(allFeeds[i][key])) {
                    return false;
                }
                if (!regular && allFeeds[i][key].length == 0) {
                    return false;
                }
            }
            return true;
        }


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('all urls are defined', function () {
            var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
            expect(isAviliable("url", regularExpressionUrl)).toBeTruthy();
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('all name are defined', function () {
            expect(isAviliable("name")).toBeTruthy();
        });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function () {
        /* TODO:
        * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
        * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
        */
        it('menu is hide', function () {
            // body有menu-hidden样式时候，menu是隐藏的
            // 这块开始想用正则做，没研究好，如果你知道帮写在这里
            // expect($(document.body).hasClass('menu-hidden')).toBeTruthy();
            expect(document.body.className.indexOf('menu-hidden')).not.toBe(-1);
        });
        /* TODO:
        * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
        * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
        * 再次点击的时候是否隐藏。
        */
        it('menu change visibale', function () {
            var menuIcon = document.getElementsByClassName("menu-icon-link")[0];
            // menuIcon 测试被定义
            expect(menuIcon).toBeDefined();
            // menuIcon 点击触发,无隐藏样式
            menuIcon.click();
            expect(document.body.className.indexOf('menu-hidden')).toBe(-1);
            // menuIcon 二次触发，有隐藏样式menu-hidden
            menuIcon.click();
            expect(document.body.className.indexOf('menu-hidden')).not.toBe(-1);
        });
    });

    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function () {
        /* TODO:
        * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
        * 里面至少有一个 .entry 的元素。
        *
        * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
        * 和异步的 done() 函数。
        */
        // 异步行数loadFeed被调用后执行done
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('loadFeed is working', function (done) {
            // 获取dom结构中文章内容的条目是否有数据
            var feed = document.getElementsByClassName('feed')[0];
            // 测试feed 被定义
            expect(feed).toBeDefined();
            var entry = feed.getElementsByClassName('entry');
            // 测试entry 被定义
            expect(entry).toBeDefined();
            expect(entry.length).toBeGreaterThan(0);
        });

    });


    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function () {
        /* TODO:
        * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
        * 记住，loadFeed() 函数是异步的。
        */
        // 缓存前后两个源的html结构内容
        var templ0, templ1;
        beforeEach(function (done) {
            var node = document.getElementsByClassName('feed')[0];
            // node 节点被定义
            expect(node).toBeDefined();
            loadFeed(0, function () {
                // 第一个源的html结构，缓存下来
                templ0 = node.innerHTML;
                loadFeed(1, function () {
                    // 再次请求第二个源的html结构缓存
                    templ1 = node.innerHTML;
                    done();
                })
            });
        });
        it('loadFeed content changed', function (done) {
            // 期望两个源的html不相同，即为内容改变
            expect(templ0).not.toEqual(templ1);
        });
    });
}());
