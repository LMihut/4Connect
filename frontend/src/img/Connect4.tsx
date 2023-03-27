
export const Connect4Img = () => {
  return (
    <svg
      width="80"
      height="70"
      viewBox="0 0 350 300"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ borderRadius: 50, opacity: 0.2 }}
    >
      <defs>
        <circle
          id="empty"
          cx=".5"
          cy=".5"
          r=".4"
          style={{ fill: "#d0d0d0", stroke: "black", strokeWidth: 0.05 }}
        />
        <circle
          id="yellow"
          cx=".5"
          cy=".5"
          r=".4"
          style={{ fill: "#6b741f", stroke: "black", strokeWidth: 0.05 }}
        />
        <circle
          id="green"
          cx=".5"
          cy=".5"
          r=".4"
          style={{ fill: "#243f24", stroke: "black", strokeWidth: 0.05 }}
        />
      </defs>
      <g transform="scale(50,50) translate(-1,-1)">
        <rect x="0" y="0" width="8" height="7" fill="#7e7e7e" />

        <use xlinkHref="#empty" x="1" y="1" />
        <use xlinkHref="#empty" x="2" y="1" />
        <use xlinkHref="#empty" x="3" y="1" />
        <use xlinkHref="#empty" x="4" y="1" />
        <use xlinkHref="#empty" x="5" y="1" />
        <use xlinkHref="#empty" x="6" y="1" />
        <use xlinkHref="#empty" x="7" y="1" />

        <use xlinkHref="#empty" x="1" y="2" />
        <use xlinkHref="#empty" x="2" y="2" />
        <use xlinkHref="#green" x="3" y="2" />
        <use xlinkHref="#yellow" x="4" y="2" />
        <use xlinkHref="#empty" x="5" y="2" />
        <use xlinkHref="#empty" x="6" y="2" />
        <use xlinkHref="#empty" x="7" y="2" />

        <use xlinkHref="#empty" x="1" y="3" />
        <use xlinkHref="#empty" x="2" y="3" />
        <use xlinkHref="#yellow" x="3" y="3" />
        <use xlinkHref="#yellow" x="4" y="3" />
        <use xlinkHref="#yellow" x="5" y="3" />
        <use xlinkHref="#green" x="6" y="3" />
        <use xlinkHref="#empty" x="7" y="3" />

        <use xlinkHref="#empty" x="1" y="4" />
        <use xlinkHref="#empty" x="2" y="4" />
        <use xlinkHref="#green" x="3" y="4" />
        <use xlinkHref="#green" x="4" y="4" />
        <use xlinkHref="#yellow" x="5" y="4" />
        <use xlinkHref="#yellow" x="6" y="4" />
        <use xlinkHref="#empty" x="7" y="4" />

        <use xlinkHref="#empty" x="1" y="5" />
        <use xlinkHref="#empty" x="2" y="5" />
        <use xlinkHref="#green" x="3" y="5" />
        <use xlinkHref="#yellow" x="4" y="5" />
        <use xlinkHref="#green" x="5" y="5" />
        <use xlinkHref="#yellow" x="6" y="5" />
        <use xlinkHref="#empty" x="7" y="5" />

        <use xlinkHref="#empty" x="1" y="6" />
        <use xlinkHref="#yellow" x="2" y="6" />
        <use xlinkHref="#green" x="3" y="6" />
        <use xlinkHref="#green" x="4" y="6" />
        <use xlinkHref="#green" x="5" y="6" />
        <use xlinkHref="#yellow" x="6" y="6" />
        <use xlinkHref="#green" x="7" y="6" />
      </g>
    </svg>
  );
};
