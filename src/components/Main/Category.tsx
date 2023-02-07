function Category() {
  return (
    <div className="bg-white rounded-md overflow-hidden m-3 hover:scale-105 cursor-pointer">
      <img
        src="https://vid.alarabiya.net/images/2017/11/19/d9027259-679c-44d6-b2da-01ba8fc30e2b/d9027259-679c-44d6-b2da-01ba8fc30e2b.jpg?crop=4:3&width=1200"
        alt="زيت"
        className="w-40 h-40"
      />
      <div className="bg-slate-100 w-40 ">
        <div className=" font-display px-2 flex justify-between flex-row-reverse">
          <h5 className="text-primary font-bold">زبت</h5>
          <p className="text-primary font-bold">50</p>
        </div>
        <p
          className="overflow-clip overflow-ellipsis whitespace-nowrap text-sm text-right "
          style={{ direction: "rtl" }}
        >
          مصر الجديدة: 12 ش الخليفة المأمون
        </p>
      </div>
    </div>
  );
}

export default Category;
