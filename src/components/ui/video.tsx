import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";

function Video({ videoId }: { videoId: string }) {
  const [load, setLoad] = useState(false);

  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoad(true);
        observer.disconnect();
      }
    });

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div ref={videoRef}>
      {load ? (
        <iframe
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          width="100%"
        />
      ) : (
        <div className="flex items-center justify-center h-[400px] w-full bg-gray-100 rounded-lg">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
}

export default Video;
