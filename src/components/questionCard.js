import { Link } from "react-router-dom";

export default function QuestionCard({ data }) {
  if (!data) {
    return (
      <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="w-full flex items-center justify-between p-6 space-x-6">
          <span>no question !!!</span>
        </div>
      </div>
    );
  }
  return (
    <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <h3 className="text-gray-900 text-sm font-medium truncate">
            {data.author}
          </h3>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {new Date(data.timestamp).toDateString()}
          </p>
        </div>
        <img
          className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
          src={`/img/${data.author}.svg`}
          alt=""
        />
      </div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="-ml-px w-0 flex-1 flex">
          <Link
            to={`/questions/${data.id}`}
            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
          >
            <span className="ml-3">Show</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
