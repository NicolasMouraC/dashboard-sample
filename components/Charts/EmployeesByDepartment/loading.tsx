export default function LoadingSkeleton() {
  return (
    <div className="bg-white shadow-xl p-5 rounded-[8px] flex flex-col grow-[1] justify-between h-auto">
      <div className="h-6 bg-gray-300 animate-pulse rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-300 animate-pulse rounded w-1/4 mb-8"></div>
      <div className="flex justify-center">
        <div className="bg-gray-200 animate-pulse rounded-full w-[280px] h-[280px]"></div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-12"
            >
              <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse mb-2"></div>
              <div className="w-8 h-3 bg-gray-300 animate-pulse rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
