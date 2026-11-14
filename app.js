// ===== Part A =====
function countByDecade(list) {
	let count2020 = 0;
	let count2010 = 0;
	let count2000 = 0;
	let countOther = 0;

	for (let i = 0; i < list.length; i++) {
		const decade = list[i].year - (list[i].year % 10);

		switch (decade) {
			case 2020:
				count2020++;
				break;
			case 2010:
				count2010++;
				break;
			case 2000:
				count2000++;
				break;
			default:
				countOther++;
				break;
		}
	}

	return { count2020, count2010, count2000, countOther };
}
const filterByRating = (list, min) => {
	return list.filter(m => m.rating >= min);
};
function filterByAudience(list, min) {
	let bigA = "";

	for (const m of list) {
		if (m.audience >= min) {
			bigA += m.title + " ";
		}
	}

	if (bigA === "") {
		return "없음";
	} else {
		return bigA.trim();
	}
}

// ===== Part B =====

//배열 → 평균 평점(숫자)
function average(list) {
	let sum = 0;
	for (const movie of list) {
		sum += movie.rating;
	}
	return sum / list.length;
}

//배열 → 최고 평점 객체
function best(list) {
	let top = list[0];
	for (const movie of list) {
		if (movie.rating > top.rating) {
			top = movie;
		}
	}
	return top;
}

// 배열, 키 이름, 참이면 내림차순 → 새 배열
function sortBy(list, key, desc = false) {
	const copied = [...list];
	const sign = desc ? -1 : 1;

	copied.sort((a, b) => {
		if (typeof a[key] === "string") {
			return sign * a[key].localeCompare(b[key]);
		} else {
			return sign * (a[key] - b[key]);
		}
	});
	return copied;
}

// 배열, 문자열 → 새 배열 
function search(list, keyword) {
	const cleaned = keyword.trim().toLowerCase();
	return list.filter(movie => 
		movie.title.toLowerCase().includes(cleaned)
	);
}

// 숫자나 숫자 문자열 → "1,234,567"
function formatNumber(n) {
	return Number(n).toLocaleString("ko-KR");
}

// "2014-11-06" → 올해까지 몇 년
function yearsSince(dateStr) {
	const year = new Date(dateStr).getFullYear();
	const currentYear = new Date().getFullYear();
	return currentYear - year;
}

const decade = countByDecade(movies);

console.log("A1 평균 평점:", average(movies));
console.log(`A2 최고: ${best(movies).title}, (평점: ${best(movies).rating})`);
console.log("A3 8점 이상:", filterByRating(movies, 8).length + "편");
console.log(`A4 2020년대 ${decade.count2020}편, 2010년대 ${decade.count2010}편, 2000년대 ${decade.count2000}편, 그 이전 ${decade.countOther}편`);
console.log("A5 관객 100만 이상:", filterByAudience(movies, 1000000));

try {
	const bestMovie = best(movies);
	const topAudience = sortBy(movies, "audience", true)[0];

	const result = 
		`전체 ${movies.length}편, 평균 평점 ${average(movies).toFixed(1)}점\n` +
		`최고 평점 ${bestMovie.title} (${bestMovie.rating}점, 개봉한 지 ${yearsSince(bestMovie.date)}년)\n` +
		`관객 1위 ${topAudience.title} (누적 ${formatNumber(topAudience.audience)}명)`;

	const out = document.getElementById("out");
	if (out) {
		out.textContent = result;
	}

} catch (error) {
	console.error("Part B 출력 중 에러 발생:", error);
}
// ===== Part C ===== 
function getList(data) {
	return data.results;
}

function averageBy(list, key) {
	let sum = 0;
	for (const item of list) {
		sum += item[key];
	}
	return sum / list.length;
}

function average(list) {
	return averageBy(list, "rating");
}
const list = getList(TMDB);
	["title", "release_date", "vote_average"]
);
