const input =
  "djhjvjggdzznllvvrvggscgscsrrffgvfvllfclcrchhwzhzqqlhqhffsdsmmcffnggcttdpttwpwttjvtjvtvqqctcwcmcsswvwzzlnzlnnvbnbdnngmmhchrcrqqhbhllbtllmppgjjtvjvdjvvpcpjcjjfrfzfzzdvzdvvswvvjzzbpzbzzddbndbbgjbjjvpjpjtjqtjqjcjmcjjrtjrjrqqvtvpvwpprhphrhdrddpdhhfsspddqnqwnntrtnrrthrhtrtwtdttmmnvmnmppswsqwqjqwqbqrqbqdbqdqgdqgqtgqqgzzhpzzwswvwmvwwvvrzznwzzbsbhbfhhvcvwvvrzrgzzfhzhhlthlhqhgqgttlmljmlmqqjddtqtctbblplddnqnzqnnzrzjrrqwrqqcfffbdfffspsqswstspsvppqmppdmppdvvfrfddqhqzqddtjddfqfrfllnjjcnnjzjmzmtmddbvdvzvbzzcjzzffdbdbsswshhrwrrfggpccszzzgdgvvlflwwdbbhqhffngffdfdmdgdhdmhdmdsspssctstdtdmdhhzvvcbbrqqmrmwwjmjqjmqjmjjjrmrmlmmbppmgpgttmptpspmmrttcddtjjspsfsqqbhbbzzgbzzznwzzlddmtdmdgmmlnljlvjjtgjjggmmnnvqnqzzfhzhttvbbprpmpmrmlrmllwmlwmlwwsjjlffbgfggqmggqgvglvvrpvrpvpnpphmhnmhhbbqjbbrrvfrfwflldffzwzccscqsqppctctddqbbmggmccdbdvbdvvpdpdbdsdjsjbbwpwcpcbcbmmzdmmvtvqvpvphhlblwwfmwmvvdhdtdwwlblglhhvfvwwqggrnrttpddtvvwqvqmqhhwnnghhbpbvbnvvdqqrqdqwqppmwpwhppnmnjmnjmjttvhhcgchcssrlrwllpdpndpdtptzppqqpvvtffcwffjppvnnjvvjnnwcwnnhlhjhsjsnjjzfjfsfhsssvttvfvsvpspppwswmswwqmwwzvwzzvtzvvwddqqzhhqpqjjwrwlrrbcbvvqllqjllvzvgvmvhmmsppwvpwphhjnndjjtpjtthzzvrrcwcrczzmqmsssvtstqtrrgtrtvtwtccbwcwrwbbdbgbmmcsmcssvjsjqqsnqqtvvbgbfbdffhjffvnnzpplqppzzfwfrfnfcncqccgjjcffhshrhgrhghvhphccqtcqtccjzccdnncggftgttrppnpptlltztqtjqqvfvqvdvmvmjjgqqrqgrqqcggdvvpcvcjvjnnrjjmbmlbmmqvmqmfmwmpwwnhwdtmvhqfwlbpzjplfhfntjgmvqmmjqpbngpvjvpgzpqwjjwhvjwwplrtjhzmzqmdrppgbrspmctlggmflbjzzfcvvdqlrtvqvwhcpjnmlvfgwrwwtblpqstddnqntnmwsbgjfrbdrlnvqdrnttshjmvpmncmggfdbnndwzmswmdvhmmwtgpfglrzzhwcsgvhnnrrhmnhftvvqfdfrsphzbslgscmwsnrwbvqphhswvpvsbbstvnndclhfhdctlvwrmdgzfcfmjmznqvvqrddmdlqznvcsqsgnpcqqhbdwqntcnqljstqvrzhgvzqdltpwmnpvjmqrpjsfhqvhchjnwjnqpdqbdjqdpqsqhbwwmhfthzbrsjnhncpbjrhgqlzmrzlnvrrfvlrmflcqfmqjzjwscrflgzwtbchfrnvsrrtncvhjbnnmlmmfdjcbmbsmgdtwzwcwnthfbsnrgdfwqjncqsdmfnfqgtcwrhjprlnhvrnpmnnhlwstvqjrsprqhjzszzgfznmgwjqglvfrrwpdbptdrnbbwbzbcbhbtcchmfsgmvnmrbdqhqgmvtfmvpgvjzjpgjbdhcfrfhprgdzrprccnhbmzdfjsgldlgpgdrfhbhtmhdttdsbndgbdfccqhhwhqfmlsfhsbbbmdncrwzcnrdvcmhllfwtrgjpgngzwptnqtggtcjwrptffmsrgdpctsdjtpssngsdqwfsbhdbcqvbdrzlhzlsbbzhqthzhcwsftlhrmhgpfzljgcphjjvhpqjzsfnrztwrhlnlbmgcgmstrbbwclpvdtdpclzlhmmpmmpmppnwjglhwppprlbzbvwqwmpgtvvpgdthnwbtblwpwgvmbcbjwjbczlcmzfwzbqvzsvgcmspvrsblldscqlgghdwzbvhhvgcfwgnqwlngclbjfwrpwtdjvqmzwwjztwdjplhzpzfslbbvfdsnpggwcttzwdlzgqgmrnpnclhrlngtwcwblzdjmpgqvzsvsdmzdwlgcdlccnnlrcvtrvspcsmgmzzvwnlzwtznwtqtdjcnhwrqhqrmvqqhrpdtnsmfrlcgpjcnddsqzcppgrnhvwsdbjvvtmvbjdncpdnmzfswmtvzfbdpqfjvwvqlhptnpdfdnlwfrgstpvvmhsqfgggdrsfgldfzbcjzhqzvfwmzccwjrslhjwlbmrpqgzdfnfbhsmdpzwtqnqldtqvshvlvmlnnmqrqbpwvnhqhtcbfclhrcqlqzhsqplsnbczvrbzqwlfwjdtmstzdbswtrvlpzzlrfvgdmldbwcttztrvsgzjwhhpcrvtgzfzppdlrdwswbnjfqqpqfbcqlzdmjsgjtzmvhdzspwlqpdjnccmbtdhnnhfvwqclbzzgglfgmvvgrccdsbwfmpvqwqrhmdzfhhhgbgjgwmnzmnggfrpspchvzpcmcpsbzgldmgqjqqdcjpwwncwrwjbhgzdbbcmbzbbtvprsjrhfwgsppdrrlzvnmtmwrmmrhtlndvsvjvgqmmttbbnpdhnjhwgrvlrdtpbrtwpwvvpslcqnvnrlhpvgdwnrzjmhwmgvpndtrjlzqpfzfbrsgbzjjqcfgsfwchblzstdflblngtzbrzrrvsczqvfhjjdlffrghgqvqfdtstqlnzllsrnnrtvrzdphbhdfpmhlfncqbdtzjqqcfbzpvgzdcsvvbfdvqrfrncbrwmpdmhnlqdscwnvldzblpzfqcvnbzmmtbmwjbczsjvzmfthfpvjcpwftqcbgjwflfrbrggwnvwndtncljfrdfwqwhfbctpjghfvnjnntnrgbfbmhplgmpfvmgvfqjslgnnrnlgztlstpcjwtlhmwlljcfmptfwsphnlsrjwmgtghgqmsvwvqsmblwpdftbrwjcdlzjmjblghszznqhsnqrcmtccgdwrrlsmwswvrjltqmwsdwvpnzltllhrsdvmrntdhtwwbgrqmrffnqbqrczvzchbgmzwtjtfzwntsnlbwbgrlvqjsqmdnwjqlwrdpnfpggzrjvtrhqdbmmbtfmmblgwtrqccqbjnljqflhgtphvrgrgghgrpbgfgdztsmfwrfflsqmrwbfjwsmpfrnbqjwnwdqwcwzpwbsmngjwfmbwdmnprdjnjbmqgfcbvtcvcthpmnmvvzdzgqqbhtjqfcdvhfzwqgfsbtvnwbzpmmtswfntjjppsswgbfrjbrstltdgbmclmbfvlslghbhnqqbdlzgtctgsfnwvbpzbvnwfbjmbfqcpqqvgrzwcbrwzdbdsjsslcjlmtprntpsdmqldzwqlqztwqtqfqzmrnzbtpqlfnsdwfdgggfvmqmrdqmnffnzcwfzsrqfpvrmsfsrbnpbhnqvdglvglllpggpmwmngrhzwgpdlzrbsvjtqmshhnlzwwftdtqwrqwgbbnczqcwmsvcljqlscftwflhwwhgnqwztfchdzsllrzbhbqwcfztjnqtdmsfnlzlcwzfmtlcgwclzfhhldgrnfjvzthzqzmzvwcrnhpdcwswpddsbwtznwlcwsnfqnqwnntngplwnfgwrcnpvgffwrcrszzdbfvzjmrmlrjwcvdvbglgncjwcnnpdfnwsrzsvzgnjrlqmwhvtdgmpbqmjthmhhmzjhpvnbvrqnlspdbcgshwlnvwpvrbcmvbvcsdmgwtmsthqtcfmllsfwvqcrbmdgqtzjwrg".split(
    ""
  );

for (let i = 0; i < input.length - 4; i++) {
  if (new Set(input.slice(i, i + 4)).size < 4) continue;
  console.log("A: Number of characters =", i + 4); // 1356
  break;
}

for (let i = 0; i < input.length - 14; i++) {
  if (new Set(input.slice(i, i + 14)).size < 14) continue;
  console.log("B: Number of characters =", i + 14); // 2564
  break;
}