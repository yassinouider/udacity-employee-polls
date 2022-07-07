import React from "react";
import {
  fetchQuestions,
  saveQuestionAnswer,
  selectQuestionById,
} from "features/question/questionSlice";
import { selectAuthedUser } from "features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPercentage } from "util/percentage";
import NotFound from "./notfound";

export default function Poll() {
  const dispatch = useDispatch();
  let { questionId } = useParams();
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  const authedUser = useSelector(selectAuthedUser);

  const [isLoading, setIsLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  const [hasVote, setHasvote] = React.useState(false);

  React.useEffect(() => {
    if (!question) return;
    setAnswer("");
    if (question.optionOne.votes.find((el) => el === authedUser.id)) {
      setHasvote(true);
      setAnswer(question.optionOne.text);
    }
    if (question.optionTwo.votes.find((el) => el === authedUser.id)) {
      setHasvote(true);
      setAnswer(question.optionTwo.text);
    }
  }, [authedUser, question]);

  const handleAnswer = async (answer) => {
    if (hasVote) return;

    setIsLoading(true);
    await dispatch(
      saveQuestionAnswer({
        authedUser: authedUser.id,
        qid: question.id,
        answer,
      })
    );
    await dispatch(fetchQuestions());
    setIsLoading(false);
  };

  if (!question) {
    return <NotFound />;
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="flex flex-col items-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">
            Poll by{" "}
            <span className="font-bold text-gray-400">{question.author}</span>
          </span>
          <img
            className="w-64 h-64"
            src={`/img/${question.author}.svg`}
            alt="img poll author"
          />
          <span className="block">Would You Rather</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={() => handleAnswer("optionOne")}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              disabled={isLoading || hasVote}
            >
              {question.optionOne.text}
            </button>
          </div>
          <div className="ml-3 inline-flex">
            <button
              onClick={() => handleAnswer("optionTwo")}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50"
              disabled={isLoading || hasVote}
            >
              {question.optionTwo.text}
            </button>
          </div>
        </div>
        {(question.optionOne.votes.length > 0 ||
          question.optionTwo.votes.length > 0) && (
          <div className="mt-8">
            <p className="mb-2">
              {question.optionOne.votes.length} users (
              {getPercentage(
                question.optionOne.votes.length +
                  question.optionTwo.votes.length,
                question.optionOne.votes.length
              )}
              %) prefer{" "}
              <span className="text-gray-500">{question.optionOne.text}</span>
            </p>
            <p>
              {question.optionTwo.votes.length} users (
              {getPercentage(
                question.optionOne.votes.length +
                  question.optionTwo.votes.length,
                question.optionTwo.votes.length
              )}
              %) prefer{" "}
              <span className="text-gray-500">{question.optionTwo.text}</span>
            </p>
          </div>
        )}
        {answer && (
          <div className="mt-8">
            <p>
              Your choice is : <span className="text-gray-500">{answer}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
