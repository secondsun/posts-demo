package dev.saga.server;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/posts")
public class Posts {
    private static final Pattern pattern = Pattern.compile("(\\#\\w+)");
    private List<Post> posts = new ArrayList<>();
    private Map<String, List<Post>> tagsMap = new HashMap<>();
    private Map<String, List<Post>> authorMap = new HashMap<>();

    {
        addPost(post("hammer_clam", "This is a #simple #test case."));
        addPost(post("hammer_clam", "incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Justo eget magna fermentum iaculis eu non diam phasellus. Morbi tristique senectus et netus. Sapien pellentesque habitant morbi tristique senectus et n"));
        addPost(post("hammer_clam", "Odio facilisis mauris sit amet massa vitae. Velit euismod in pellentesque massa placerat. #simple commodo quis imperdiet massa. Venenatis cras sed feli"));
        addPost(post("some_user", "This not is a simple test case."));
        addPost(post("some_user", "Cursus risus at ultrices mi #test. Pharetra pharetra massa massa ultricies mi."));
        addPost(post("some_user", " tristique senectus et. Eu mi bibendum neque egestas. Vulputate dignissim suspendisse in est ante in nibh. Iaculis at erat pellentesque adipiscing ."));
        addPost(post("some_user", "Dignissim cras tincidunt lobortis feugiat vivamus at. Diam volutpat commodo sed egestas egestas fringilla phasellus. Enim sit amet venenatis urna cursus eget nunc scelerisque."));

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> hello() {
        return new ArrayList<>(posts);
    }

    private Post post(String author, String text) {
        Post post = new Post();
        post.setAuthor(author);
        post.setText(text);
        return post;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean addPost(Post post) {

        addToAuthorMap(post);
        addToTagsMap(post);

        posts.add(0,post);

        return true;
    }

    private void addToTagsMap(Post post) {
        
        Matcher matcher = pattern.matcher(post.getText());
        while (matcher.find()) {
            String match = matcher.group(1);
            List<Post> postList = tagsMap.get(match);
            if (postList == null) {
                postList = new ArrayList<>();
                tagsMap.put(match, postList);
            }
            postList.add(0, post);
        }
    }

    private void addToAuthorMap(Post post) {
        List<Post> postList = authorMap.get(post.getAuthor());
        if (postList == null) {
            postList = new ArrayList<>();
            authorMap.put(post.getAuthor(), postList);
        }
        postList.add(0, post);
    }

    @GET
    @Path("/tags/{tag}")
    @Produces(MediaType.APPLICATION_JSON)

    public List<Post> getWithTag(@PathParam("tag") String tag) {
        return new ArrayList<>(tagsMap.getOrDefault("#"+tag, new ArrayList<>()));
    }

    @GET
    @Path("/author/{tag}")
    @Produces(MediaType.APPLICATION_JSON)

    public List<Post> getWithAuthor(@PathParam("tag") String tag) {
        return new ArrayList<>(authorMap.getOrDefault(tag, new ArrayList<>()));
    }

    

}
