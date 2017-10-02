/*
This script adds all existing members of the slack-team to a channel which is useful if we create new channels
that we want everyone to join.

This is how you do it:
- Open chrome web browser and log into the slack-team.
- Go to the channel that you want all members to join
- Open the console in chrome dev tools
- Paste the script and watch it go

-- May need repetition until all members are invited, has some kind of max-limit per run.

Origin URL:
https://webapps.stackexchange.com/questions/100820/how-do-i-invite-all-team-members-to-a-new-slack-channel
 */

var foundAny=false;
function selectAllByLetter(remainingLetters) {
    console.log(remainingLetters)
    var letter = remainingLetters.pop();
    $("#channel_invite_filter").val(letter).trigger("input");
    setTimeout(function() {
        $(".channel_invite_member:not(hidden)").each(function(i, obj) {
            foundAny=true;
            this.click();
        });
        if (remainingLetters.length) {
            selectAllByLetter(remainingLetters);
        } else {
            setTimeout(function() {
                console.log("Inviting them all!")
                $('.invite_go').click()
            },400)
        }
    },300);
}

function inviteAllUsers() {
    foundAny=false;
    setTimeout(function () {
        setTimeout(function() {
            $('#channel_actions_toggle').click();
        },100)
        setTimeout(function() {
            $('#channel_invite_item').click();
        },200)
        //Enter each letter to trigger searches
        var remainingLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        selectAllByLetter(remainingLetters);
        if (foundAny) {
            inviteAllUsers();
        }
    }, 4000);
}

inviteAllUsers();