import React, { useState, useEffect, useRef } from "react";
import { type Question } from "@/entities/question/model/types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";
import "@/styles/question-page/QuestionCard.scss";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import plaintext from "highlight.js/lib/languages/plaintext";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerAliases(["jsx"], { languageName: "javascript" });
hljs.registerAliases(["tsx"], { languageName: "typescript" });

interface QuestionCardProps {
  question: Question;
}

const stripInlineStyles = (html: string) => html.replace(/\sstyle="[^"]*"/g, "");

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [open]);

  return (
    <article className={`question-accordion ${open ? "is-open" : ""}`}>
      <header className="question-accordion__header" onClick={handleToggle}>
        <div className="question-accordion__title-group">
          <span className="question-accordion__dot" />
          <h3 className="question-accordion__title">{question.title}</h3>
        </div>
        <button
          type="button"
          className="question-accordion__chevron"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        >
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </header>

      {open && (
        <div className="question-accordion__body" ref={bodyRef}>
          <div className="question-accordion__meta">
            <span className="badge">
              Рейтинг: <span className="badge__value">{question.rate}</span>
            </span>
            <span className="badge">
              Сложность: <span className="badge__value">{question.complexity}</span>
            </span>
          </div>

          <div
            className="question-accordion__description"
            dangerouslySetInnerHTML={{ __html: stripInlineStyles(question.longAnswer) }}
          />
        </div>
      )}
    </article>
  );
};