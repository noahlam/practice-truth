miment 一个只有1kb的moment

### 介绍
miment是一个moment的缩水版,保留了90%以上常用api(甚至更多哦),体积缩小到只有1K.
如果你是一个跟我一样,追求极简/轻量的人,那么建议试试miment吧, [github仓库地址](https://github.com/noahlam/Miment)
### API列表
1, **转换**

miment()可以自动转换string/number/date/miment等多种类型
1. `miment()`
1. `miment('2018-05-05')`
1. `miment(new Date())`
1. `miment(1523408529932)`

2, **输出**

1. `format`  输出字符串
1. `json`  输出json
1. `stamp` 输出时间戳
1. `get`   输出给定单位的时间量
1. `diff`  计算2个时间的毫秒差
1. `daysInMonth`  输出当前月份的总天数
1. `isBefore`  判断当前时间是否早于某个时间
1. `isAfter`  判断当前时间是否晚于某个时间
1. `isBetween` 判断当前时间是否介于两个时间之间

3, **操作** (返回miment对象,可继续链试调用)

1. `add` 增加/减少 时间
1. `sub` 减少/增加 时间
1. `set` 设置时间
1. `distance` 计算2个时间的距离(该功能可以用于计算2个时间的倒计时)
1. `firstDayOfWeek` 获取本周的第一天
1. `firstDay` 获取每月的第一天
1. `lastDay` 获取每个月的最后一天

4, **原生Date对象 自有方法**

getDate()，getDay()，getFullYear()，getHours()，getMilliseconds()，getMinutes()，
getMonth()，getSeconds()，getTime()，getTimezoneOffset()，getUTCDate()，getUTCDay()，
getUTCFullYear()，getUTCHours()，getUTCMilliseconds()，getUTCMinutes()，getUTCMonth()，
getUTCSeconds()，getYear()，setDate()，setFullYear()，setHours()，setMilliseconds()，
setMinutes()，setMonth()，setSeconds()，setTime()，setUTCDate()，setUTCFullYear()，
setUTCHours()，setUTCMilliseconds()，setUTCMinutes()，setUTCMonth()，setUTCSeconds()，
setYear()，toDateString()，toUTCString()，toISOString()，toJSON()，toLocaleDateString()，
toLocaleString()，toLocaleTimeString()，toString()，toTimeString()，toUTCString()，valueOf()
具体请参 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date">考官方文档</a>

### miment 与其他时间库有那些不同?

1,minent是以轻量为核心,抛弃了大部分moment不常用的方法来减轻代码量.但是又保留了绝大部分moment常用的功能.
2,miment针对国人,增加了`星期的格式化`,增加了`两个时间的时间差`(可以直接格式化出倒计时)
3,miment继承自Date对象,所有保留了Date对象的所有方法


了解更多,请前往 [gayhub地址](https://github.com/noahlam/Miment),如果喜欢,请给我一个star,万分感谢!
