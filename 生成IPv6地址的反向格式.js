/**
 * 生成IPv6地址的反向DNS解析格式（.ip6.arpa）
 * 支持带有CIDR表示法（如/64, /48）的输入。
 * 如果不提供CIDR，则默认处理为/128（完整地址）。
 *
 * @param {string} ipv6WithCidr - IPv6地址字符串，例如 "2001:db8:abcd:12::/64" 或 "2001:470:b623::/48"。
 * @returns {string} IPv6地址的反向格式字符串。
 */
function 生成IPv6地址的反向格式(ipv6WithCidr) {
    // 1. 解析地址和CIDR前缀长度
    const [address,cidrStr] = ipv6WithCidr.split('/');
    // 如果没有提供CIDR，默认为128（完整地址）
    const cidrLength = parseInt(cidrStr || '128', 10);

    // 2. 将IPv6地址展开为完整的8组4位十六进制数
    // 例如: "2001:db8::1" -> "2001:0db8:0000:0000:0000:0000:0000:0001"
    let parts = address.split(':');
    const doubleColonIndex = parts.indexOf('');

    if (doubleColonIndex !== -1) {
        // 计算需要用"0000"填充的组数
        const numZerosToAdd = 8 - (parts.length - 1);
        const zeros = new Array(numZerosToAdd).fill('0000');
        // 替换"::"
        parts = [...parts.slice(0, doubleColonIndex), ...zeros, ...parts.slice(doubleColonIndex + 1)];
    }

    // 将每个部分用前导零填充到4位
    const expandedAddress = parts.map(part => part.padStart(4, '0')).join(':');

    // 3. 【核心修正】根据CIDR长度，先截取前缀部分
    // CIDR长度代表位数，一个十六进制字符是4位。
    // 所以需要保留的字符数是 cidrLength / 4。
    const numNibblesToKeep = cidrLength / 4;
    const prefixNibbles = expandedAddress.replaceAll(':', '').substring(0, numNibblesToKeep);

    // 4. 反转这个前缀部分，并用点号连接
    const reversedPrefix = prefixNibbles.split('').toReversed().join('.');

    // 5. 追加 ".ip6.arpa" 后缀
    return `${reversedPrefix}.ip6.arpa`;
}

// --- 使用示例（使用修正后的函数）---

// 示例 1: /64 地址
const ipv6_64 = "2001:db8:abcd:12::/64";
const reverse64 = 生成IPv6地址的反向格式(ipv6_64);
console.log(`输入: ${ipv6_64}`);
console.log(`输出: ${reverse64}`);
// 正确输出: 2.1.0.0.d.c.b.a.8.b.d.0.1.0.0.2.ip6.arpa

console.log('---');

// 示例 2: /48 地址
const ipv6_48 = "2001:470:b623::/48";
const reverse48 = 生成IPv6地址的反向格式(ipv6_48);
console.log(`输入: ${ipv6_48}`);
console.log(`输出: ${reverse48}`);
// 正确输出: 3.2.6.b.0.7.4.0.1.0.0.2.ip6.arpa

console.log('---');

// 示例 3: 完整地址（不带CIDR，默认为/128）
const ipv6_full = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
const reverseFull = 生成IPv6地址的反向格式(ipv6_full);
console.log(`输入: ${ipv6_full}`);
console.log(`输出: ${reverseFull}`);
// 正确输出: 4.3.3.7.0.7.3.0.e.2.a.8.0.0.0.0.0.0.0.0.3.a.5.8.8.b.d.0.1.0.0.2.ip6.arpa

console.log('---');

// 示例 4: 缩写地址（不带CIDR）
const ipv6_short = "2001:db8::1";
const reverseShort = 生成IPv6地址的反向格式(ipv6_short);
console.log(`输入: ${ipv6_short}`);
console.log(`输出: ${reverseShort}`);
// 正确输出: 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa

export {生成IPv6地址的反向格式}
