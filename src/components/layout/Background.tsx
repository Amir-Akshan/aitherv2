import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/bg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
