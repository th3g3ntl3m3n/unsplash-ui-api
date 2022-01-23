import { ThemeProvider } from "styled-components";
import { Wrapper } from "./Components/common";
import { theme } from "./Components/colors";
import { HomePage } from "./Pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <HomePage />
      </Wrapper>
    </ThemeProvider>
  );
}
// function App() {
//   return (
//     <Wrapper>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/list" element={<ListDetailPage />} />
//       </Routes>
//     </Wrapper>
//   );
// }

export default App;
