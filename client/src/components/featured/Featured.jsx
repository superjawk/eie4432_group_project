import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    //"/cinemas/countByCity?cities=berlin,madrid,london"
    //"/movies/countAll?titles=movie1,movie2"
    "/movies/countAll?limit=4"
  );
  console.log(data);

  //const [getData, setData] = useState(data);

  //const hi = "abc";

  return (
    <div className="featured">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.img} alt="" className="fpImg" />
              <span className="fpName">{item.title}</span>
              <span className="fpCity">{item.price}</span>
              <span className="fpPrice">Starting from ${item.price}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.desc}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {/*
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/19224452/pexels-photo-19224452.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>movie1</h1>
              <h2>{"loading" || data[0].title} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>movie2</h1>
              <h2>{"loading" || data[0].title} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>movie3</h1>
              <h2>{"loading" || data[0].title} properties</h2>
            </div>
          </div>
        </>
      )}
      */}
    </div>
  );
};

export default Featured;
