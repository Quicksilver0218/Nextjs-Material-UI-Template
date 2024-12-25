import { Metadata } from "next";
import styles from "./page.module.scss";
import getDictionary from "@/app/dictionaries";
import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import LocaleSelect from "../../../components/locale-select";
import AccumulatorForm from "./accumulator-form";
import SampleForm from "./sample-form";
import ThemeRadio from "@/app/components/theme-radio";

export const metadata: Metadata = {
  title: "Next.js Material UI Template",
};

export default async function Page({ params }: { params: Promise<{
  lang: string
}> }) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  
  return (
    <Container sx={{ marginY: 2 }}>
      <Typography variant="h2">Next.js Material UI Template</Typography>
      <Typography variant="h5">
        A template of{" "}
        <Link href="https://nextjs.org" target="_blank" rel="noreferrer nooppener">
          Next.js
        </Link>{" "}
        with{" "}
        <Link href="https://mui.com" target="_blank" rel="noreferrer nooppener">
          Material UI
        </Link>
        , developed by{" "}
        <Link href="https://github.com/Quicksilver0218" target="_blank" rel="noreferrer nooppener">
          Quicksilver0218
        </Link>
        .
      </Typography>
      <Typography>Next.js Version: 15.1.2</Typography>
      <Box sx={{marginTop: 2}}>
        <hr />
      </Box>
      <Typography variant="h4">Features</Typography>
      <Typography>Some backend and frontend features of Next.js and this template are listed below.</Typography>
      <Typography variant="h5">TypeScript Ready</Typography>
      <Typography>
        This project is developed with{" "}
        <Link href="https://www.typescriptlang.org" target="_blank" rel="noreferrer nooppener">
          TypeScript
        </Link>
        .
      </Typography>
      <Typography variant="h5">Server-side Rendering</Typography>
      <Typography>This page is rendered at the server side. You can see all the content in the first response.</Typography>
      <Typography variant="h5">SASS and SCSS Ready</Typography>
      <Typography>
        Both{" "}
        <Link href="https://sass-lang.com" target="_blank" rel="noreferrer nooppener">
          SASS
        </Link>{" "}
        and{" "}
        <Link href="https://sass-lang.com/documentation/syntax" target="_blank" rel="noreferrer nooppener">
          SCSS
        </Link>{" "}
        are supported.
      </Typography>
      <Typography variant="h5" className={styles["scss-demo-text"]}>
        SCSS is used to style this text.
      </Typography>
      <Typography variant="h5">Material UI Ready</Typography>
      <Typography>
        <Link href="https://mui.com" target="_blank" rel="noreferrer nooppener">
          Material UI
        </Link>{" "}
        is included as a UI component library.
      </Typography>
      <ThemeRadio />
      <Typography variant="h5">Internationalization</Typography>
      <Typography>
        Sub-path routing is used for i18n. A redirection will be given to every page request with an URL without
        locale.
        <br />
        The below message is displayed with translation:
      </Typography>
      <Grid2 container spacing={2} p={2}>
        <Grid2 size={{xs: "auto"}}>
          <LocaleSelect locale={lang} />
        </Grid2>
        <Grid2 size={{xs: "auto"}} display="flex" alignItems="center">
          <Typography variant="subtitle1" color="secondary">{dict["HelloWorld"]}</Typography>
        </Grid2>
      </Grid2>
      <Typography variant="h5">Global State Management System</Typography>
      <Typography>
        Redux is <b>NOT</b> included in this project. Instead, React hooks are used. Below is an example:
      </Typography>
      <AccumulatorForm />
      <Typography>
        You can see the debug logging in the console if the server is not run with <code>NODE_ENV=production</code>.
        Please note that the reducer will be called twice for each action in non-production mode.
      </Typography>
      <Typography variant="h5">Server-side Form Validation</Typography>
      <Typography>
        <Link href="https://github.com/Quicksilver0218/Object-Validator" target="_blank" rel="noreferrer nooppener">
          Object-Validator
        </Link>{" "}
        is used for form validation.
        <br />
        Here is a sample form with 2-side input validation.
      </Typography>
      <SampleForm />
      <Box sx={{marginTop: 2}}>
        <hr />
      </Box>
      <Typography variant="h4">Compilers, Libraries and Frameworks</Typography>
      <Typography>The compilers, libraries and frameworks used are mentioned above. Here it is a summary.</Typography>
      <Typography variant="h5">Base</Typography>
      <ul>
        <li>
          <Link href="https://nextjs.org" target="_blank" rel="noreferrer nooppener">
            Next.js
          </Link>
        </li>
        <li>
          <Link href="https://reactjs.org" target="_blank" rel="noreferrer nooppener">
            React
          </Link>
        </li>
      </ul>
      <Typography variant="h5">Environment</Typography>
      <ul>
        <li>
          <Link href="https://nodejs.org" target="_blank" rel="noreferrer nooppener">
            Node.js
          </Link>
        </li>
        <li>
          <Link href="https://www.typescriptlang.org" target="_blank" rel="noreferrer nooppener">
            TypeScript
          </Link>
        </li>
      </ul>
      <Typography variant="h5">Frontend</Typography>
      <ul>
        <li>
          <Link href="https://sass-lang.com" target="_blank" rel="noreferrer nooppener">
            SASS/SCSS
          </Link>
        </li>
        <li>
          <Link href="https://mui.com" target="_blank" rel="noreferrer nooppener">
            Material UI
          </Link>
        </li>
      </ul>
      <Typography variant="h5">Input Validation</Typography>
      <ul>
        <li>
          <Link href="https://github.com/Quicksilver0218/Object-Validator" target="_blank" rel="noreferrer nooppener">
            Object-Validator
          </Link>
        </li>
      </ul>
      <Box sx={{marginTop: 2}}>
        <hr />
      </Box>
      <Typography variant="h4">Directory Structure</Typography>
      <Typography>All the default directories from Next.js are kept. The{" "}
        <Link href="https://nextjs.org/docs/app/getting-started/project-structure#src-directory" target="_blank" rel="noreferrer nooppener">
          <code>/src</code> directory approach
        </Link>{" "}
        with{" "}
        <Link href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer nooppener">
          App Router
        </Link>{" "}
        is used. Extra directories are listed below:</Typography>
      <Typography variant="h5">src/app/components</Typography>
      <Typography>Contains common React components for using in different pages.</Typography>
      <Typography variant="h5">src/app/(pages)</Typography>
      <Typography>A{" "}
        <Link href="https://nextjs.org/docs/app/getting-started/project-structure#route-groups" target="_blank" rel="noreferrer nooppener">
          route group
        </Link>{" "}
        for all pages. Other route groups can be added under <code>src/app</code>.
      </Typography>
      <Typography variant="h5">src/dictionaries</Typography>
      <Typography>
        Contains translated text of different locales. Please see{" "}
        <Link href="https://nextjs.org/docs/app/building-your-application/routing/internationalization" target="_blank" rel="noreferrer nooppener">
          Internationalization
        </Link>
        .
      </Typography>
      <Typography variant="h5">src/lib</Typography>
      <Typography>Contains custom code for global use.</Typography>
      <Typography variant="h5">src/lib/state</Typography>
      <Typography>
        Contains global state management related code with{" "}
        <Link href="https://redux.js.org" target="_blank" rel="noreferrer nooppener">
          Redux
        </Link>{" "}
        design pattern. You may customize <i>state</i>, <i>actions</i> and <i>reducers</i> respectively in{" "}
        <i>index.ts</i>, <i>action</i> and <i>reducer.ts</i>. Please note that it is not Redux.
      </Typography>
      <Box sx={{marginTop: 2}}>
        <hr />
      </Box>
      <Typography variant="h4">Coding Styles and Naming Conventions</Typography>
      <Typography>
        These coding styles and naming conventions are recommended in the projects, but you are free to ignore some or
        all of them for your convenience. However, you should keep the coding styles and naming conventions consistent
        in the whole project.
      </Typography>
      <Typography variant="h5">Overall</Typography>
      <Typography variant="h6">File Name</Typography>
      <ol>
        <li>
          Use hyphen delimited strings with lower case. e.g. <code>intro-form.ts</code>. However, the default files
          from Next.js are kept for your convenience.
        </li>
      </ol>
      <Typography variant="h6">Spacing</Typography>
      <ol>
        <li>
          Use 2 or 4 spaces indentation. The number of spaces of an indentation level should be consistent within the
          same file.
        </li>
        <li>Add an empty line between classes or functions on declaration.</li>
        <li>
          Place <code>&#123;</code> at the same line of classes or functions on declaration, and add 1 space in front
          of them. e.g.
          <br />
          use <code>class A &#123;</code> instead of <code>class A&#123;</code> or
          <br />
          <code>
            class A<br />
            &#123;
          </code>
          .
        </li>
        <li>
          Add 1 space in front of <code>(</code> in the condition expression of flow controls. e.g. use{" "}
          <code>if (a === b)</code> instead of <code>if(a === b)</code>.
        </li>
        <li>
          Add 1 space behind <code>:</code> and <code>,</code> if there are no line breaks or spaces at that place.
        </li>
      </ol>
      <Typography variant="h5">JavaScript/TypeScript</Typography>
      <Typography>
        You should know the coding conventions of{" "}
        <Link href="https://google.github.io/styleguide/jsguide.html" target="_blank" rel="noreferrer nooppener">
          JavaScript
        </Link>{" "}
        and{" "}
        <Link href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer nooppener">
          TypeScript
        </Link>{" "}
        before considering these rules. Also, please use TypeScript instead of JavaScript as much as possible to take
        the advantages of strong typing.
      </Typography>
      <Typography variant="h6">Spacing</Typography>
      <ol>
        <li>
          Add 1 space on each side of assignment operators (e.g. <code>=</code>, <code>+=</code>, <code>-=</code>{" "}
          etc.) and <code>=&gt;</code> if there are no line breaks or spaces at that place.
        </li>
      </ol>
      <Typography variant="h5">CSS/SASS/SCSS</Typography>
      <Typography variant="h6">Class Name</Typography>
      <ol>
        <li>
          Use hyphen delimited strings with lower case. e.g. <code>list-title</code>.
        </li>
        <li>
          If the properties can be changed, avoid adding them to the class name. e.g. consider using{" "}
          <code>text-highlight</code> instead of <code>text-background-yellow</code>, except it always has and only
          has the yellow background property.
        </li>
        <li>
          Use <code>subject-variant</code> syntax. e.g. <code>list-dark</code> contains properties of a list with dark
          theme, and <code>list-light</code> contains that with light theme. Common properties are included in{" "}
          <code>list</code>. Then the element may look like{" "}
          <code>&lt;div class=&quot;list list-dark&quot;&gt;&lt;/div&gt;</code>.
        </li>
        <li>
          Use <code>parent-child</code> syntax. e.g. <code>nav-item</code>.
        </li>
      </ol>
      <Typography variant="h6">Function and Mixin Name</Typography>
      <ol>
        <li>
          Use hyphen delimited strings with lower case. e.g. <code>@function text-stroke()</code>.
        </li>
      </ol>
      <Typography variant="h5">JSX/TSX</Typography>
      <Typography variant="h6">React Component</Typography>
      <ol>
        <li>
          Use functional components instead of class components to take the advantages of{" "}
          <Link href="https://reactjs.org/docs/hooks-intro.html" target="_blank" rel="noreferrer nooppener">
            Hooks
          </Link>{" "}
          and make the code clearer.
        </li>
      </ol>
      <Typography variant="h6">Element Class</Typography>
      <ol>
        <li>
          Use the bracket notation instead of the dot notation for accessing classes in imported CSS modules. e.g. use{" "}
          <code>styles[&quot;class&quot;]</code> instead of <code>styles.class</code>. If the class name contains{" "}
          <code>-</code>, only the bracket notation is available. So, always use the bracket notation for consistency.
        </li>
        <li>
          Use array with <code>join()</code> to handle elements with multiple classes. e.g. use{" "}
          <code>
            className=&#123;[&quot;global-class-1 global-class-2&quot;, styles[&quot;module-class-1&quot;],
            styles[&quot;module-class-2&quot;]].join(&quot; &quot;)&#125;
          </code>{" "}
          instead of{" "}
          <code>
            className=&#123;&quot;global-class-1 global-class-2 &quot; + styles[&quot;module-class-1&quot;] + &quot;
            &quot; + styles[&quot;module-class-2&quot;]&#125;
          </code>
          .
        </li>
      </ol>
      <Box sx={{marginTop: 2}}>
        <hr />
      </Box>
      <Typography>
        <small>
          Copyright © 2024 Quicksilver0218.
          <br />
          Licensed under the MIT License.
        </small>
      </Typography>
    </Container>
  );
}
