export default function RandbackDrop() {

    return (
    <div className="absolute top-0 right-0 w-1/2 h-80 opacity-30 pointer-events-none"> 
        {/* placeholder image for now */}
        <img
          src="public/logo-dark"
          alt="Champion"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-400"></div>
    </div>)
}