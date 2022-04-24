//递归生成前端所需的生成树
export const getCategoryTree = (data) => {
    let i = 0;
    const maps = (data) => {
        return data.map((item) => {
            let obj = {
                id: i++,
                label: item.name,
            };
            if (item.hasOwnProperty("list")) {
                if (item.list)
                    obj.children = maps(item.list);
            }
            return obj;
        });
    };
    console.log(maps(data));
    return maps(data);
}