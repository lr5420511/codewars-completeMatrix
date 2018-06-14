'use strict';

function completeMatrix(matrix, unknow = null) {
    matrix.forEach((row, i) =>
        row.forEach((cur, j) => {
            const coors = getCoors([i, j], matrix),
                row = pre.rule(coors[0], matrix, unknow),
                col = pre.rule(coors[1], matrix, unknow),
                supers = getSupers(
                    row.slice(1), col.slice(1)
                );
            if (supers.length !== 1) return;
            matrix[
                    supers[0][0]
                ][
                    supers[0][1]
                ] = row.length === Math.min(row.length, col.length) ?
                pre.rule(row[0], col[0]) :
                pre.rule(col[0], row[0]);
        })
    );
    return pre.handler(matrix);
}

const pre = completeMatrix.preset = {
    handler: function(res, unknow) {
        const vaild = res.every(row =>
            row.every(cur =>
                cur !== unknow && cur > 0
            )
        );
        return vaild ? res : null;
    },
    rule: function() {
        const args = [].slice.call(arguments);
        if (args.length === 2) return args[0] - args[1];
        return [
            [0], ...args[0]
        ].reduce((res, cur) => {
            const val = args[1][cur[0]][cur[1]];
            (val === args[2] && (res.push(cur))) ||
            (res[0] += val);
            return res;
        });
    }
};

const getCoors = function(coor, map) {
    const rowIndex = coor[0],
        colIndex = coor[1];
    return [
        map[0].map((cur, i) => [rowIndex, i]),
        map.map((cur, i) => [i, colIndex])
    ];
};

const getSupers = function(fir, sec) {
    fir = fir.filter(fCur => {
        const temp = sec.filter(sCur =>
                !(fCur[0] === sCur[0] && fCur[1] === sCur[1])
            ),
            len = sec.length;
        sec = temp;
        return len === temp.length;
    });
    return [...fir, ...sec];
};