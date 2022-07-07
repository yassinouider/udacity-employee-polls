import { saveQuestion } from "features/question/questionSlice";
import { selectAuthedUser } from "features/user/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Add() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [optionOneText, setOptionOneText] = React.useState("");
  const [optionTwoText, setOptionTwoText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const authedUser = useSelector(selectAuthedUser);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError(false);
    if (!optionOneText || !optionTwoText) {
      setError(true);
      return;
    }
    await dispatch(
      saveQuestion({ optionOneText, optionTwoText, author: authedUser.id })
    );
    setIsLoading(false);
    navigate("/");
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Would You Rather
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your own poll
          </p>
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <div className="ml-3">
                <p className="text-sm text-yellow-700" data-testid="error-msg">
                  First Option and second option are required.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="optionOne"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Option
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setOptionOneText(e.target.value)}
                    id="optionOne"
                    name="optionOne"
                    type="text"
                    //required
                    data-testid="input-optionone"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="optionTwo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Second Option
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setOptionTwoText(e.target.value)}
                    id="optionTwo"
                    name="optionTwo"
                    type="text"
                    //required
                    data-testid="input-optiontwo"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  data-testid="submit-btn"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <svg
                      className="animate-spin  h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
