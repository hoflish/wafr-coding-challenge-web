import React from "react";
import debounce from "lodash.debounce";

class Repos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      isLoading: false,
      hasMore: true,
      page: 1
    };

    window.onscroll = debounce(() => {
      const { isLoading, hasMore } = this.state;

      if (isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.state.page++;
        this.fetchRepos();
      }
    }, 100);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    const { page } = this.state;
    this.setState({ isLoading: true }, () => {
      fetch(
        `https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=50&page=${page}`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            repos: [...this.state.repos, ...data.items],
            isLoading: false,
            hasMore:
              this.state.repos.length < Math.floor(data.total_count / 100000)
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ isLoading: false });
        });
    });
  };

  render() {
    const { repos, isLoading, hasMore } = this.state;
    return (
      <div className="section">
        <div className="container">
          <div className="list is-hoverable">
            {repos.map(repo => (
              <div className="wr-row" key={repo.id}>
                <div className="wr-repo-name">
                  <a href={repo.html_url}>{repo.name}</a>
                </div>
                <div className="wr-repo-desc">{repo.description}</div>
              </div>
            ))}
          </div>
          {isLoading && <div style={{ textAlign: "center" }}>Loading...</div>}

          {!hasMore && (
            <div style={{ textAlign: "center" }}>That's enough!</div>
          )}
        </div>
      </div>
    );
  }
}
export default Repos;
