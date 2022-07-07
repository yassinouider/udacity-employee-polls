import React from "react";
import { useSelector } from "react-redux";
import { QuestionCard } from "components";
import { selectQuestionByAnswers } from "features/question/questionSlice";

export default function Dashboard() {
  const questions = useSelector(selectQuestionByAnswers);

  if (!questions) {
    return (
      <section>
        <h2>Question not found!</h2>
      </section>
    );
  }

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <h2 className="text-xl font-bold leading-tight text-gray-900">
              New questions
            </h2>
            <div className="mt-6">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {questions.new.map((el) => {
                  return (
                    <li key={el.id}>
                      <QuestionCard data={el} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <h2 className="text-xl font-bold leading-tight text-gray-900">
              Done
            </h2>
            <div className="mt-6">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {questions.done.map((el) => {
                  return (
                    <li key={el.id}>
                      <QuestionCard data={el} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
