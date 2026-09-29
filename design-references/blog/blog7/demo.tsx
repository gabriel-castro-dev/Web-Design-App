import { Blog7 } from "./blog7";

const demoData = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  buttonText: "Explore all posts",
  buttonUrl: "https://www.shadcnblocks.com",
  posts: [
    {
      id: "post-1",
      title: "Build websites in minutes with shadcn/ui",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://cdn.21st.dev/assets/mirror/e2/e276687cf540bc1b76306090f5cb5c8da7e75540aa3699c82434199e4c022aac.svg",
    },
    {
      id: "post-2",
      title: "Easily copy code to build your website",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://cdn.21st.dev/assets/mirror/e2/e276687cf540bc1b76306090f5cb5c8da7e75540aa3699c82434199e4c022aac.svg",
    },
    {
      id: "post-3",
      title: "The future of web design",
      summary:
        "Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.",
      label: "Ut varius dolor turpis",
      author: "Jane Doe",
      published: "1 Jan 2024",
      url: "https://www.shadcnblocks.com",
      image: "https://cdn.21st.dev/assets/mirror/e2/e276687cf540bc1b76306090f5cb5c8da7e75540aa3699c82434199e4c022aac.svg",
    },
  ],
};

function Blog7Demo() {
  return <Blog7 {...demoData} />;
}

export { Blog7Demo };
