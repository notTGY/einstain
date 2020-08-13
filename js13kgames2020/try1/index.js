start=_=>{
    onresize();
    ctx=canvas.getContext`2d`;
};

onresize=_=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
};

